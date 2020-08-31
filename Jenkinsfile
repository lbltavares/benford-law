pipeline {
    agent {
        docker { image 'node:14-alpine' }
    }
    environment {
        HOME = '.'
    } 
    stages { 
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }
}
