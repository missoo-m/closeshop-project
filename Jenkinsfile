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
                withMaven(maven: 'M3_HOME') {
                    sh 'mvn clean install'
                }
            }
        }
        stage('Test') {
            steps {
                withMaven(maven: 'M3_HOME') {
                    sh 'mvn test'
                }
            }
        }

    }
}
