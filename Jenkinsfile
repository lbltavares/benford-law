pipeline {
    agent {
        docker { image 'node:14-alpine' }
    }
    stages {
        stage('Info') {
            steps {
                sh 'INFO'
                sh 'ls -la'
                sh 'pwd'
                sh 'echo $USER'
            }
        }    
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
