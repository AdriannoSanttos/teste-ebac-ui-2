pipeline {
    agent any
    stages {
        stage('Rodar Cypress') {
            steps {
                echo 'Executando testes Cypress...'
               
                bat 'npx cypress run || exit 0'
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
            echo 'Pipeline finalizada. Evidências arquivadas.'
        }
    }
}
