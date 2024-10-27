pipeline {
    agent any

    stages {
        stage('Checkout Code from GitHub') {
            steps {
                echo 'Checking out code from GitHub'
                git url: 'https://github.com/Raju9934/nodeapp.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker Image'
                sh 'docker build -t nodeapp:1.0.4 .'
            }
        }

        stage('Run Docker Container') {
            steps {
                echo 'Stopping any existing container'
                sh '''
                docker ps -q --filter "name=nodeapp" | grep -q . && docker stop nodeapp || true
                docker rm nodeapp || true
                '''
                echo 'Running Docker Container'
                sh 'docker run -d -p 8003:8003 --name nodeapp nodeapp:1.0.4'
            }
        }

        stage('Tag Docker Image for Docker Hub') {
            steps {
                echo 'Tagging Docker image for Docker Hub'
                sh 'docker tag nodeapp:1.0.4 2024dock/nodeapp:1.0.4'
            }
        }

        stage('Docker Login and Push') {
            steps {
                echo 'Logging in and pushing Docker image to Docker Hub'
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-pwd', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                        sh "echo $PASS | docker login -u $USER --password-stdin"
                        sh 'docker push 2024dock/nodeapp:1.0.4'
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
