pipeline {
    agent {
        docker { image 'node:14-alpine' }
        args '-v $HOME/.m2:/root/.m2'
    }
    stages {
        stage('Info') {
            steps {
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
