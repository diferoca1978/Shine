# Instrucciones para Claude Code: Workflow Git

Cuando ejecutes este workflow, sigue estos pasos en orden:

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

## Validación SSH
1. Ejecuta `git remote get-url origin` para obtener la URL del repositorio
2. Si la URL comienza con "git@", es SSH y debe verificar:
   - Ejecuta `ssh -T git@github.com` (o el host correspondiente)
   - Si falla, detén el proceso y proporciona instrucciones para configurar SSH
3. Si la URL comienza con "https://", continúa sin validación SSH

## Push Seguro
1. Obtén la rama actual nuevamente con `git branch --show-current`
2. Valida que la rama esté en la lista permitida:
   - Ramas permitidas: `dev`, `development`, `staging`
   - Ramas que comiencen con: `feature/`, `features/`, `hotfix/`, `bugfix/`
3. **PROHIBIDO**: Nunca hacer push a `main` o `master`
4. Si la rama es válida, ejecuta `git push origin [rama-actual]`
5. Si es el primer push de la rama, usa `git push -u origin [rama-actual]`
6. Confirma que el push fue exitoso

## Manejo de Errores
- Si cualquier comando Git falla, detén el proceso y explica el error
- Si hay conflictos de merge, proporciona instrucciones para resolverlos
- Si el push falla por problemas de permisos, ayuda a diagnosticar el problema
- Si el push es rechazado, sugiere hacer `git pull --rebase` primero

## Restricciones Absolutas
- **NUNCA** ejecutes `git push origin main` o `git push origin master`
- **NUNCA** uses `git push --force` sin confirmación explícita del usuario
- **NUNCA** permitas commits sin mensaje descriptivo
- **NUNCA** continúes si la validación SSH falla (cuando es requerida)
- **NUNCA** hagas push a ramas que no estén en la lista permitida