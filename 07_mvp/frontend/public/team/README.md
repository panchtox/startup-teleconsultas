# 📸 Foto del Equipo - Easter Egg

## 🎯 Ubicación correcta

**Poné tu foto del equipo ACÁ:**
```
C:\00_dev\00_playground\startup-teleconsultas\07_mvp\frontend\public\team\team-photo.png
```

## ✅ Formato

- Nombre del archivo: **`team-photo.png`** (exactamente así)
- Formatos soportados: PNG, JPG, JPEG, WEBP
- Si usás JPG: renombralo a `team-photo.png` O actualizá el componente

## 🔧 Si cambiás el nombre o formato:

Editá este archivo:
```
src/components/demo/TeamEasterEgg.tsx
```

Línea 80, cambiá:
```tsx
src="/team/team-photo.png"
```

## 📝 Notas importantes:

- Los archivos en la carpeta `public/` se sirven directamente desde la raíz
- No necesitás importarlos en el código
- La ruta en el código es `/team/team-photo.png` (sin "public")
- Vite maneja esto automáticamente

## 🎨 Recomendaciones:

- **Tamaño:** 800-1200px de ancho
- **Aspecto:** Horizontal funciona mejor en el modal
- **Peso:** < 500KB para carga rápida
- **Formato:** PNG con fondo transparente se ve genial

---

**¡Colocá la foto aquí y recargá la página!** 🚀
