pipeline {
    agent any

    environment {
        CYPRESS_CACHE_FOLDER = "${WORKSPACE}\\.cache"
    }

    stages {
        stage('Preparar Ambiente') {
            steps {
                echo 'Instalando dependências...'
                bat 'npm install'
                echo 'Instalando Cypress...'
                bat 'npx cypress install'
            }
        }

        stage('Executar Testes Cypress') {
            steps {
                echo 'Rodando testes Cypress...'
                bat 'npm run cypress:run'
            }
        }

        stage('Arquivar Artefatos') {
            steps {
                echo 'Arquivando vídeos e screenshots...'
                archiveArtifacts artifacts: 'cypress/videos/**/*.mp4', allowEmptyArchive: true
                archiveArtifacts artifacts: 'cypress/screenshots/**/*.png', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            echo 'Pipeline finalizado.'
        }
        success {
            echo 'Todos os testes passaram!'
        }
        failure {
            echo 'Algum teste falhou!'
        }
    }
}
