# 🌱 Calculadora de Huella Verde

Una aplicación moderna y elegante para calcular tu huella de carbono y recibir recomendaciones personalizadas mediante IA para contribuir al cuidado del planeta.

## ✨ Características Principales

- 🤖 Sugerencias personalizadas con IA (OpenAI)
- 🌍 Interfaz bilingüe (Español/Inglés)
- 📊 Visualización de datos con gráficos interactivos
- 🎯 Cálculos precisos de emisiones de CO₂
- 💫 Animaciones y transiciones fluidas
- 🎨 Diseño moderno con tema ambiental
- 📱 Diseño responsivo para todos los dispositivos
- 🔒 Manejo seguro de API keys
- 🌿 Sistema de bonificaciones por prácticas sostenibles

## 🛠️ Stack Tecnológico

### Frontend
- React 18 con TypeScript
- Vite como bundler
- Tailwind CSS para estilos
- shadcn/ui para componentes UI
- Chart.js para visualizaciones
- Lucide Icons para iconografía
- Zustand para gestión de estado

### Integraciones
- OpenAI API para sugerencias personalizadas
- Soporte para múltiples proveedores de IA (extensible)

## 📋 Categorías de Medición

### Vivienda
- 🏢 Tipo de vivienda (Departamento/Casa pequeña/Casa grande)
- ⚡ Electricidad (kWh/mes)
- 🏠 Gas (m³/mes)

### Transporte
- 🚗 Tipo de vehículo (Gasolina/Diesel/Híbrido/Eléctrico)
- 🚗 Distancia recorrida (km/mes)
- 🚌 Transporte Público (km/mes)
- ✈️ Vuelos (km/mes)

### Alimentación y Residuos
- 🥩 Consumo de Carne (kg/mes)
- 🥗 Frutas y Verduras (kg/mes)
- 🗑️ Residuos (kg/mes)

### Otros
- 🎮 Entretenimiento (horas/mes)

## 🌟 Características Detalladas

### Factores de Ajuste
- 🏘️ Ajustes por tipo de vivienda:
  - Departamento: -20% emisiones
  - Casa pequeña: Base
  - Casa grande: +30% emisiones
- 🚙 Ajustes por tipo de vehículo:
  - Gasolina: Base
  - Diesel: +10% emisiones
  - Híbrido: -40% emisiones
  - Eléctrico: -70% emisiones

### Cálculo de Emisiones
- 📊 Cálculo en tiempo real
- 📈 Desglose detallado por categoría
- 🔄 Actualizaciones instantáneas
- 💹 Gráficos interactivos

### Sistema de Bonificaciones
- 🌿 Reducción por uso de energías renovables
- ♻️ Reducción por reciclaje activo
- 📉 Cálculo automático de reducciones

### Sugerencias de IA
- 🤖 Análisis personalizado de emisiones
- 💡 Recomendaciones específicas
- 🎯 Objetivos de reducción
- 💪 Mensajes motivacionales

### Internacionalización
- 🌐 Soporte completo ES/EN
- 🔄 Cambio dinámico de idioma
- 📝 Contenido localizado

## 🚀 Inicio Rápido

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/calculadora-huella-verde.git

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus claves API

# Iniciar servidor de desarrollo
npm run dev
```

## 💻 Desarrollo

### Requisitos Previos
- Node.js 18+
- npm 8+
- Cuenta en OpenAI (para funciones de IA)

### Scripts Disponibles
```bash
npm run dev      # Inicia servidor de desarrollo
npm run build    # Construye para producción
npm run preview  # Vista previa de producción
npm run lint     # Ejecuta el linter
```

## 🤝 Contribuciones

1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add: AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📝 Notas Importantes

### Cálculos y Factores de Emisión
- Basados en estándares internacionales
- Actualizados regularmente
- Valores aproximados para referencia
- Factores de ajuste por tipo de vivienda y vehículo

### Seguridad
- No almacenamos claves API
- Datos procesados localmente
- Sin persistencia de información sensible

### Rendimiento
- Optimizado para carga rápida
- Cálculos eficientes
- Caché inteligente de resultados

## 📜 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- Comunidad de desarrolladores
- Contribuidores de código abierto
- Usuarios que proporcionan feedback

---

Desarrollado con 💚 para un futuro más sostenible