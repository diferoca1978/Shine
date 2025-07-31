# Ejecutar workflow completo de Git
claude-code "Implementa el siguiente workflow de Git: $ARGUMENTS

1. Verifica que no estoy en la rama main, si estoy en main cámbiame a dev
2. Verifica el estado del repositorio con git status
3. Agrega todos los cambios al staging area
4. Haz un mensaje de commit descriptivo siguiendo el siguente formato:
   - Tipos de Commit Recomendados:
      feat: Nueva funcionalidad
      fix: Corrección de bug
      docs: Cambios en documentación
      style: Cambios de formato (espacios, comas, etc.)
      refactor: Refactorización de código
      test: Agregar o modificar tests
      chore: Mantenimiento general
5. Haz el commit con el mensaje generado
6. Verifica si el repositorio requiere SSH:
   - Si la URL remota es git@, verifica la conexión SSH
   - Usa la llave dada como argumento para continuar con el proceso
7. Valida que la rama actual sea permitida (dev, development, staging, o features/*)
8. Si todo está correcto, haz push a la rama actual
9. Confirma que el push fue exitoso

No permitas push a la rama main bajo ninguna circunstancia."