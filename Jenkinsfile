pipeline {
    agent any

    environment {
        CYPRESS_CACHE_FOLDER = "${env.WORKSPACE}\\.cache\\Cypress"
        REPORTS_FOLDER = "${env.WORKSPACE}\\reports"
    }

    stages {
        stage('Checkout SCM') {
            steps {
                git branch: 'main', url: 'https://github.com/AdriannoSanttos/teste-ebac-ui-2.git'
            }
        }

        stage('Preparar Ambiente') {
            steps {
                echo "Instalando dependências..."
                bat 'npm ci'
            }
        }

        stage('Instalar Cypress (se necessário)') {
            steps {
                echo "Verificando Cypress..."
                bat """
                if not exist "%CYPRESS_CACHE_FOLDER%\\13.6.0\\Cypress\\Cypress.exe" (
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
                echo "Rodando testes..."
                bat """
                npx cypress run ^
                --reporter mochawesome ^
                --reporter-options reportDir=%REPORTS_FOLDER%,overwrite=false,html=false,json=true
                """
            }
            post {
                always {
                    echo "Testes finalizados."
                }
            }
        }

        stage('Gerar relatório PDF') {
            steps {
                echo "Gerando relatório PDF..."
                bat """
                if exist "%REPORTS_FOLDER%\\*.json" (
                    npx mochawesome-merge "%REPORTS_FOLDER%\\*.json" > "%REPORTS_FOLDER%\\mochawesome.json"
                    npx marge "%REPORTS_FOLDER%\\mochawesome.json" --reportDir "%REPORTS_FOLDER%" --reportFilename "report" --overwrite
                ) else (
                    echo Nenhum arquivo JSON gerado, pulando merge.
                )
                """
            }
        }

        stage('Arquivar artifacts') {
            steps {
                archiveArtifacts artifacts: 'reports/**/*.*', fingerprint: true
            }
        }
    }

    post {
        always {
            echo "Pipeline finalizado. Verifique os reports e vídeos arquivados."
        }
    }
}
