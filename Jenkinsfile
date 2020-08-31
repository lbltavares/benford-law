pipeline {
    agent {
        docker { image 'node:14-alpine' }
    }
    stages {
        stage('Info') {
            steps {
                sh 'echo INFO'
                sh 'ls -la'
                sh 'pwd'
                sh 'echo $USER'
            }
        }    
        stage('Build') {
            steps {
                sh 'sudo chown -R 112:117 "/.npm"'
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
