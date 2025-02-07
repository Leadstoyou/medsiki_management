pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS_ID = 'docker-kk-hub'
        GIT_CREDENTIALS_ID = 'capstone_management_system_frontend'
        FRONTEND_DOCKER_USERNAME = "doandaihiep"
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
        SSH_CREDENTIALS_ID = 'capstone_server'
        FRONTEND_DOCKER_REPO = "capstone_management_system_frontend"
        SSH_TARGET_SERVER = 'root 146.190.200.221'
    }

    stages {
        stage('Set Environment') {
            steps {
                script {
                    branchName = env.GIT_BRANCH.replaceFirst(/^origin\//, '')
                        env.FRONTEND_DOCKERFILE = "Dockerfile.prod"
                        env.FRONTEND_DOCKER_TAG = "prod"
                        env.CONTAINER_NAME = "front_end_prod"
                        sshagent([SSH_CREDENTIALS_ID]) {
                        def result = sh(script: '''
                        ssh -o StrictHostKeyChecking=no -l ${SSH_TARGET_SERVER} "docker inspect front_end_prod_blue > /dev/null 2>&1 && echo blue || echo green"
                        ''', returnStdout: true).trim()
                          env.CURRENT_VERSION = result
                          env.NEW_VERSION = (result == "blue") ? "green" : "blue"
                    }
                }
            }
        }

        stage('git clone') {
            steps {
                git branch: "${branchName}", credentialsId: "${GIT_CREDENTIALS_ID}", url: 'https://gitlab.com/capstone-management-system/frontend.git'
            }
        }

        stage('Build and Push FRONTEND Image') {
            steps {
                script {
                    withDockerRegistry(credentialsId: "${DOCKER_HUB_CREDENTIALS_ID}", url: 'https://index.docker.io/v1/') {
                        sh "docker build -f ${FRONTEND_DOCKERFILE} -t ${FRONTEND_DOCKER_USERNAME}/${FRONTEND_DOCKER_REPO}:${FRONTEND_DOCKER_TAG} ."
                        sh "docker push ${FRONTEND_DOCKER_USERNAME}/${FRONTEND_DOCKER_REPO}:${FRONTEND_DOCKER_TAG}"
                    }
                }
            }
        }

        stage('Deploy to Server') {
            steps {
                script {
                  sshagent([SSH_CREDENTIALS_ID]) {
                        sh """
                            ssh -o StrictHostKeyChecking=no -l ${SSH_TARGET_SERVER} << EOF
                            docker compose -f ${DOCKER_COMPOSE_FILE} pull ${CONTAINER_NAME}_${NEW_VERSION} &&
                            docker compose -f ${DOCKER_COMPOSE_FILE} up -d ${CONTAINER_NAME}_${NEW_VERSION} &&
                            sleep 10 &&
                            docker exec -i nginx sed -i "s/server front_end_prod_${CURRENT_VERSION}:/server front_end_prod_${NEW_VERSION}:/" /etc/nginx/conf.d/default.conf &&
                            docker exec -i nginx nginx -s reload &&
                            docker compose -f ${DOCKER_COMPOSE_FILE} stop ${CONTAINER_NAME}_${CURRENT_VERSION} &&
                            docker compose -f ${DOCKER_COMPOSE_FILE} rm -f ${CONTAINER_NAME}_${CURRENT_VERSION} &&
                            docker system prune -af
                            EOF
                            """
                    }
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline finished ${branchName}!!"
        }
    }
}
