pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/missoo-m/closeshop-project.git'
            }
        }
        stage('Build') {
            steps {
                sh 'mvn clean install'
            }
        }
        stage('Test') {
            steps {
                sh 'mvn test'
            }
        }
        stage('Docker Build') {
            when {
                expression { return fileExists('Dockerfile') }
            }
            steps {
                sh 'docker build -t finalshop-api:latest .'
            }
        }
        stage('Docker Integration Test - Actuator Health') {
            when {
                expression { return fileExists('docker-compose.yml') }
            }
            steps {
                sh '''#!/bin/sh
                    set -eu
                    docker compose up -d --build
                    cid="$(docker compose ps -q api)"
                    echo "API container id: $cid"

                    i=0
                    while [ $i -lt 60 ]; do
                      status="$(docker inspect -f '{{.State.Health.Status}}' "$cid")"
                      echo "Actuator health status: $status"
                      if [ "$status" = "healthy" ]; then
                        exit 0
                      fi
                      sleep 2
                      i=$((i+1))
                    done

                    echo "Actuator health did not become healthy in time"
                    docker inspect -f '{{.State.Health.Status}}' "$cid"
                    exit 1
                '''
            }
        }
        stage('Deploy') {
            steps {
                sh 'target/finalShop-0.0.2-SNAPSHOT.jar user@server:/deploy/path'
            }
        }
    }
    post {
        always {
            sh 'docker compose down -v --remove-orphans || true'
        }
    }
}
