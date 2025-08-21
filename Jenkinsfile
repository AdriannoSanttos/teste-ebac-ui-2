pipeline {
    agent any

    environment {
        REPORT_DIR = "${env.WORKSPACE}\\reports"
    }

    stages {
        stage('Checkout SCM') {
            steps {
                git url: 'https://github.com/AdriannoSanttos/teste-ebac-ui-2.git', branch: 'main'
            }
        }

        stage('Preparar Ambiente') {
            steps {
                echo 'Instalando dependências...'
                bat 'npm ci'
                echo 'Instalando Mochawesome e dependências de relatório...'
                bat 'npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator'
            }
        }

        stage('Instalar Cypress (se necessário)') {
            steps {
                echo 'Verificando Cypress...'
                bat """
                if not exist "${env.WORKSPACE}\\.cache\\Cypress\\13.6.0\\Cypress\\Cypress.exe" (
                    echo Cypress não encontrado, instalando...
                    npx cypress install
                ) else (
                    echo Cypress já instalado
                )
                """
            }
        }

        stage('Executar testes Cypress') {
            steps {
                echo 'Rodando testes...'
                bat """
                npx cypress run ^
                --reporter mochawesome ^
                --reporter-options reportDir=${env.REPORT_DIR},overwrite=false,html=false,json=true
                """
            }
        }

        stage('Gerar relatório PDF') {
            steps {
                echo 'Gerando relatório PDF a partir do Mochawesome...'
                bat """
                if exist "${env.REPORT_DIR}\\*.json" (
                    npx mochawesome-merge ${env.REPORT_DIR}\\*.json > ${env.REPORT_DIR}\\mochawesome.json
                    npx marge ${env.REPORT_DIR}\\mochawesome.json --reportDir ${env.REPORT_DIR} --reportFilename report --overwrite
                ) else (
                    echo Nenhum arquivo JSON gerado, pulando merge.
                )
                """
            }
        }

        stage('Arquivar artifacts') {
            steps {
                archiveArtifacts artifacts: 'reports/**/*.*', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            echo 'Pipeline finalizado. Verifique os reports e vídeos arquivados.'
        }
    }
}
