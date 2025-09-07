#AIURIS – Frontend ✨

📝 Descripción

Frontend de la plataforma modular de servicios de IA para el Poder Judicial de la Provincia de Formosa. Permite autenticarse, cargar y gestionar documentos, configurar prompts, chatear en tiempo real con agentes de IA y generar borradores fundamentados mediante RAG (búsqueda semántica + LLM), con referencias trazables, edición y exportación.

✨ Características

🎨 UI con Vue + Vuetify: diseño responsivo, tema claro/oscuro y componentes accesibles.

🔐 Autenticación JWT: access y refresh tokens, guards de ruta y roles básicos.

📂 Gestión de fuentes: carga de documentos (drag & drop), validaciones y barra de progreso.

💬 Chat en tiempo real: interacción con agentes de IA vía WebSockets (streaming y estados de tarea).

🧠 Generación asistida (RAG): prompt + recuperación semántica → borrador con citas a las fuentes.

✍️ Edición y exportación: vista previa, versionado básico y exportación a DOCX/PDF.

🧭 Trazabilidad: identificación de fuentes, versiones y acciones visibles desde la UI.

