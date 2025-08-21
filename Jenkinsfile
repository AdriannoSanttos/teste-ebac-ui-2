pipeline {
    agent any
    environment {
        REPORT_DIR = "${WORKSPACE}\\reports"
        VIDEO_DIR  = "${WORKSPACE}\\cypress\\videos"
    }
    stages {

        stage('Preparar ambiente') {
            steps {
                echo 'Preparando diretórios...'
                bat """
                if not exist "%REPORT_DIR%" mkdir "%REPORT_DIR%"
                """
            }
        }

        stage('Executar testes Cypress') {
            steps {
                echo 'Rodando testes Cypress...'
                catchError(buildResult: 'SUCCESS', stageResult: 'UNSTABLE') {
                    bat """
                    npx cypress run ^
                    --reporter mochawesome ^
                    --reporter-options reportDir=%REPORT_DIR%,overwrite=false,html=false,json=true
                    """
                }
            }
        }

        stage('Gerar relatório PDF') {
            steps {
                echo 'Gerando relatório PDF...'
                bat """
                if exist "%REPORT_DIR%\\*.json" (
                    echo "Mesclando relatórios JSON..."
                    npx mochawesome-merge %REPORT_DIR%\\*.json > %REPORT_DIR%\\merged.json
                    echo "Criando PDF a partir do merged.json..."
                    npx marge %REPORT_DIR%\\merged.json --reportDir %REPORT_DIR% --reportTitle "Relatório de Testes" --saveHtml false --saveJson false
                ) else (
                    echo "Nenhum arquivo JSON de relatório encontrado. Pulando merge."
                )
                """
            }
        }

        stage('Arquivar artifacts') {
            steps {
                echo 'Arquivando reports e vídeos...'
                archiveArtifacts artifacts: 'reports/**/*', allowEmptyArchive: true
                archiveArtifacts artifacts: 'cypress/videos/**/*', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            echo 'Pipeline finalizado. Verifique os reports e vídeos arquivados.'
        }
        success {
            echo 'Pipeline concluído com sucesso!'
        }
        unstable {
            echo 'Pipeline concluído com testes com falhas.'
        }
        failure {
            echo 'Pipeline finalizado com falha.'
        }
    }
}
