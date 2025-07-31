# Instrucciones para Claude Code: Workflow Git

Cuando ejecutes este workflow, sigue estos pasos en orden:

## Pre-validaciones
1. Ejecuta `git branch --show-current` para verificar la rama actual
2. Si la rama es "main", ejecuta `git checkout dev` automáticamente
3. Si no existe la rama dev, pregúntame si quiero crearla o cambiar a una feature branch

## Proceso de Staging
1. Ejecuta `git status` para mostrar el estado actual
2. Ejecuta `git add .` para agregar todos los cambios
3. Ejecuta `git status` nuevamente para confirmar los cambios staged

## Commit Interactivo
1. Solicítame un mensaje de commit
2. Valida que el mensaje siga el formato: "tipo(alcance): descripción"
3. Si no cumple el formato, sugiéreme correcciones
4. Ejecuta el commit con el mensaje validado

## Validación SSH
1. Ejecuta `git remote get-url origin` para obtener la URL del repositorio
2. Si la URL comienza con "git@", es SSH y debes verificar:
   - Ejecuta `ssh -T git@github.com` (o el host correspondiente)
   - Si falla, detén el proceso y guíame para configurar SSH
3. Si la URL comienza con "https://", continúa sin validación SSH

## Push Seguro
1. Obtén la rama actual nuevamente
2. Valida que la rama esté en la lista permitida: [dev, development, staging] o comience con "features/"
3. Si la rama es válida, ejecuta `git push origin [rama-actual]`
4. Confirma que el push fue exitoso

## Manejo de Errores
- Si cualquier comando Git falla, detén el proceso y explícame el error
- Si hay conflictos de merge, guíame para resolverlos
- Si el push falla por problemas de permisos, ayúdame a diagnosticar

## Restricciones Absolutas
- NUNCA ejecutes `git push origin main`
- NUNCA permitas commits sin mensaje descriptivo
- NUNCA continúes si la validación SSH falla (cuando es requerida)