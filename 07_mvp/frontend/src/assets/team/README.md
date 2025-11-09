# 📝 Instrucciones - Easter Egg del Equipo

## 🎯 ¿Qué es esto?

Un "huevo de pascua" (easter egg) en la demo interactiva de TeleAssist. Cuando alguien hace click en el corazón verde (💚) del celular simulado, aparece un modal elegante con:

- ✨ Animación de corazón verde grande
- 📸 Foto del equipo TeleAssist
- 💚 Corazones animados decorativos
- 📧 Información de contacto

## 📁 Ubicación de tu foto

Colocá la foto del equipo en:

```
C:\00_dev\00_playground\startup-teleconsultas\07_mvp\frontend\src\assets\team\team-photo.jpg
```

### Formatos soportados:
- ✅ `.jpg` o `.jpeg` 
- ✅ `.png`
- ✅ `.webp`

### Si usás otro formato:

Actualizá la línea 78 del archivo:
`C:\00_dev\00_playground\startup-teleconsultas\07_mvp\frontend\src\components\demo\TeamEasterEgg.tsx`

Cambiá:
```tsx
src="/src/assets/team/team-photo.jpg" 
```

Por el formato que uses:
```tsx
src="/src/assets/team/team-photo.png"
// o
src="/src/assets/team/team-photo.webp"
```

## 🎨 Recomendaciones para la foto:

- **Tamaño:** 800-1200px de ancho
- **Aspecto:** Horizontal (landscape) funciona mejor
- **Peso:** Menor a 500KB para carga rápida
- **Formato:** JPG con calidad 85% es ideal

## 🧪 Cómo probar:

1. Colocá la foto en la carpeta indicada
2. Iniciá el servidor de desarrollo (`npm run dev`)
3. Navegá a la página `/demo`
4. Hacé click en el corazón verde (💚) del "App Bar" del celular
5. ¡Debería aparecer el modal con la foto!

## 🔧 Si la foto no aparece:

El componente tiene un **fallback automático**: si no encuentra la imagen, muestra un placeholder verde con el texto "Foto del Equipo".

Para debugging, abrí la consola del navegador (F12) y fijate si hay errores de carga de imagen.

## 📝 Archivos modificados:

1. ✅ `/src/pages/Demo.tsx` - Agregado estado y botón clickeable
2. ✅ `/src/components/demo/TeamEasterEgg.tsx` - Componente del modal
3. ✅ `/src/assets/team/` - Carpeta creada para la foto

## 🎉 Features del Easter Egg:

- Click en corazón 💚 abre el modal
- Click fuera del modal lo cierra
- Tecla `ESC` también lo cierra
- Animaciones suaves (fade-in, zoom, pulse)
- Responsive (se ve bien en mobile y desktop)
- No interfiere con la funcionalidad de la demo

---

**¡Listo para sorprender a tu audiencia en la demo del jueves!** 🚀
