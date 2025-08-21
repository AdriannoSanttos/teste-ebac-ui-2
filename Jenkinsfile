pipeline {
    agent any

    environment {
        REPORT_DIR = "${WORKSPACE}/reports"
        PDF_REPORT = "${WORKSPACE}/reports/report.pdf"
    }

    stages {
        stage('Checkout SCM') {
            steps {
                echo 'Fazendo checkout do repositório...'
                checkout scm
            }
        }

        stage('Preparar Ambiente') {
            steps {
                echo 'Instalando dependências...'
                bat 'npm ci'
            }
        }

        stage('Instalar Cypress (se necessário)') {
            steps {
                echo 'Verificando Cypress...'
                bat """
                if not exist "${WORKSPACE}\\.cache\\Cypress\\13.6.0\\Cypress\\Cypress.exe" (
                    echo Cypress não encontrado, instalando...
                    npx cypress install
                ) else (echo Cypress já instalado)
                """
            }
        }

        stage('Executar testes Cypress') {
            steps {
                echo 'Rodando testes...'
               
                catchError(buildResult: 'SUCCESS', stageResult: 'UNSTABLE') {
                    bat """
                    npx cypress run ^
                    --reporter mochawesome ^
                    --reporter-options reportDir=${env.REPORT_DIR},overwrite=false,html=false,json=true
                    """
                }
            }
        }

        stage('Gerar relatório PDF') {
            steps {
                echo 'Gerando relatório PDF...'
                bat """
                npx mochawesome-merge ${env.REPORT_DIR}\\*.json > ${env.REPORT_DIR}\\merged.json
                npx marge ${env.REPORT_DIR}\\merged.json --reportDir ${env.REPORT_DIR} --reportTitle "Relatório de Testes" --saveHtml false --saveJson false
                """
            }
        }

        stage('Arquivar artifacts') {
            steps {
                echo 'Arquivando reports e vídeos...'
                archiveArtifacts artifacts: 'reports/**/*.*', allowEmptyArchive: true
                archiveArtifacts artifacts: 'cypress/videos/**/*.*', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            echo 'Pipeline finalizado. Verifique os reports e vídeos arquivados.'
        }
    }
}
