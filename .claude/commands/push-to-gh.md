# Instrucciones para Claude Code: Workflow Git Local

Cuando ejecutes este workflow, sigue estos pasos en orden:

## Ramas permitidas: 
- dev
- features/*

## Pre-validaciones
1. Ejecuta `git branch --show-current` para verificar la rama actual
2. Si la rama es "main", ejecuta `git checkout dev` automáticamente
3. Si no existe la rama dev, pregunta si se debe crear o cambiar a una feature branch

## Proceso de Staging
1. Ejecuta `git status` para mostrar el estado actual
2. Ejecuta `git add .` para agregar todos los cambios
3. Ejecuta `git status` nuevamente para confirmar los cambios staged

## Commit Interactivo
1. Crea un mensaje de commit descriptivo
2. Valida que el mensaje siga el formato convencional: 
    - `feat: Nueva funcionalidad` (ej: "feat: add user authentication system")
    - `fix: Corrección de bug` (ej: "fix: resolve login validation error")
    - `docs: Cambios en documentación` (ej: "docs: update API documentation")
    - `style: Cambios de formato` (ej: "style: fix code formatting and indentation")
    - `refactor: Refactorización de código` (ej: "refactor: optimize database queries")
    - `test: Agregar o modificar tests` (ej: "test: add unit tests for user service")
    - `chore: Mantenimiento general` (ej: "chore: update dependencies")
3. Si no cumple el formato, sugiere correcciones automáticamente
4. Ejecuta el commit con el mensaje validado

## Manejo de Errores
- Si cualquier comando Git falla, detén el proceso y explica el error
- Si hay conflictos de merge, proporciona instrucciones para resolverlos
- Proporciona diagnósticos claros para cualquier problema de git

## Restricciones Absolutas
- **PROHIBIDO TOTALMENTE**: Cualquier comando `git push` en cualquier forma
- **PROHIBIDO TOTALMENTE**: Comandos `git pull` que puedan modificar el repositorio remoto
- **PROHIBIDO TOTALMENTE**: Usar `git push --force`, `git push --force-with-lease`, o cualquier variante de force push
- **PROHIBIDO TOTALMENTE**: Ejecutar `git remote add`, `git remote set-url`, o modificar configuraciones remotas
- **PROHIBIDO TOTALMENTE**: Comandos que interactúen con repositorios remotos sin confirmación explícita
- **NUNCA** permitas commits sin mensaje descriptivo
- **NUNCA** modifiques la rama main o master directamente
- **NUNCA** ejecutes comandos destructivos como `git reset --hard` sin confirmación explícita
- **NUNCA** modifiques el historial de commits con `git rebase -i` o `git filter-branch`
- **NUNCA** elimines ramas sin confirmación explícita del usuario

## Operaciones Permitidas Únicamente
- Comandos de consulta: `git status`, `git log`, `git diff`, `git branch`
- Operaciones locales: `git add`, `git commit`, `git checkout`, `git stash`
- Creación de ramas locales: `git branch`, `git checkout -b`
- Visualización de información: `git show`, `git blame`, `git config --list`