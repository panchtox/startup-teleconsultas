# 📝 CHANGELOG - 13 de Noviembre 2025 (Tarde)

## 📊 Ajuste de Métricas en Landing - Números Más Conservadores

### Problema Identificado
Las métricas en el Hero de la landing mostraban números muy específicos que podían parecer poco realistas o difíciles de garantizar:
- "+156 Horas médicas recuperadas/mes" - Demasiado preciso
- "$72K Ahorro anual por médico" - Sin disclaimers, muy categórico

### Solución Implementada ✅

#### 1. Métrica: Horas Recuperadas
**Antes:**
```
+156
Horas médicas recuperadas/mes
```

**Después:**
```
~150
Horas médicas recuperadas/mes*
```

**Cambios:**
- ✅ `+156` → `~150` (número redondeado con símbolo aproximado)
- ✅ Agregado asterisco para referencia al disclaimer

---

#### 2. Métrica: Ahorro Anual
**Antes:**
```
$72K
Ahorro anual por médico
```

**Después:**
```
Hasta $72K
Ahorro anual estimado*
```

**Cambios:**
- ✅ Agregado "Hasta" para indicar máximo posible
- ✅ "por médico" → "estimado" (más genérico)
- ✅ Agregado asterisco para referencia al disclaimer

---

#### 3. Métrica: Reducción de Ausentismo
**Sin cambios:**
```
73%
Reducción de ausentismo
```

**Razón:** Es un porcentaje relativo (de 33% a ~9%), por lo que está bien como está.

---

#### 4. Disclaimer Agregado
Nuevo texto al pie de las métricas:
```
* Cifras aproximadas basadas en clínicas medianas con 10+ médicos 
  y 33% de ausentismo inicial
```

**Características:**
- Tamaño: `text-xs` (pequeño, no invasivo)
- Color: `text-gray-500` (discreto)
- Estilo: `italic` (diferenciado del resto)
- Posición: Debajo de las 3 métricas

---

## 📋 Comparación Visual

| Métrica | Antes | Después | Justificación |
|---------|-------|---------|---------------|
| **Reducción** | 73% | 73% | ✅ OK - Es porcentaje relativo |
| **Horas** | +156 | ~150 | ✅ Redondeado y aproximado |
| **Ahorro** | $72K | Hasta $72K | ✅ Indica máximo posible |
| **Disclaimer** | ❌ Ausente | ✅ Presente | Aclara contexto |

---

## 🎯 Impacto en Credibilidad

**Antes:**
- ⚠️ Números muy específicos pueden generar desconfianza
- ⚠️ Sin contexto de aplicabilidad
- ⚠️ Parece "demasiado bueno para ser verdad"

**Después:**
- ✅ Números realistas y alcanzables
- ✅ Contexto claro (clínicas medianas, 10+ médicos)
- ✅ Lenguaje conservador genera más confianza
- ✅ Cumple con buenas prácticas de marketing B2B

---

## 🔍 Detalle Técnico

**Archivo modificado:**
- `src/components/landing/Hero.tsx`

**Líneas cambiadas:** 3 bloques
1. Métrica de horas (línea ~52-56)
2. Métrica de ahorro (línea ~58-62)  
3. Disclaimer nuevo (línea ~64-68)

---

## ✅ Testing Checklist

- [ ] Verificar que el símbolo `~` se vea correctamente
- [ ] Validar que "Hasta" no rompa el layout en mobile
- [ ] Confirmar que el disclaimer es legible pero discreto
- [ ] Probar en diferentes tamaños de pantalla

---

## 📈 Mejores Prácticas Aplicadas

1. **Conservadurismo:** "Prometer menos, entregar más"
2. **Transparencia:** Disclaimer con contexto específico
3. **Credibilidad:** Números redondeados y realistas
4. **Legal:** Protección ante posibles cuestionamientos

---

## 🚀 Deploy

**Status:** ✅ Listo para deploy  
**Impacto:** Bajo (solo texto, sin cambios estructurales)  
**Riesgo:** Muy bajo  

---

**Desarrollado por:** Fran (Founder TeleAssist)  
**Fecha:** 13 de Noviembre, 2025  
**Categoría:** UX Copy / Marketing
