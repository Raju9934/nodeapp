pipeline
{
    agent any
    stages
    {
        stage('checkout code from github')
        {
            steps
            {
                git url: 'https://github.com/Raju9934/nodeapp.git'
                echo 'Checkout  code from Github'
            }
        }
        stage('Build Docker Image')
        {
            steps{
                echo 'Building Docker Image'
                sh 'docker build -t nodeapp:1.0.4 .'
            }
        }
        stage('Run Docker Container')
        {
            steps{
                echo 'Running Docker Container'
                sh 'docker run -d -p 8003:8003 nodeapp:1.0.4'
            }
        }
        stage('Build Docker Image for Docker Hub')
        {
            steps{
                sh 'docker tag nodeapp:1.0.4 2024dock/nodeapp:1.0.4'
            }
        }
        stage('Docker Login')
        {
            steps{
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-pwd', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                        sh "echo $PASS | docker login -u $USER --password-stdin"
                        sh 'docker push 2024dock/nodeapp:1.0.4' 
                    }
                }

            }
        }
    }
}
