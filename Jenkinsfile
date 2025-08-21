pipeline {
    agent any
    stages {
        stage('Executar testes Cypress') {
            steps {
                echo 'Rodando testes Cypress...'
                bat 'npx cypress run'
            }
        }

        stage('Arquivar evidências') {
            steps {
                echo 'Arquivando vídeos e screenshots...'
                archiveArtifacts artifacts: 'cypress/videos/**/*', allowEmptyArchive: true
                archiveArtifacts artifacts: 'cypress/screenshots/**/*', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            echo 'Pipeline finalizado. Vídeos e screenshots arquivados como evidência.'
        }
    }
}
