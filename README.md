# El odio en francés

Prototipo local de tres pantallas, basado en la captura de referencia: inicio, la bronca se comparte y cómo te ves.

Con Node.js instalado, ejecutar `node server.cjs` desde esta carpeta y abrir http://localhost:3000.

Sin dependencias de instalación. Las fuentes de Google son opcionales y cuentan con alternativas locales. La gráfica está construida con Canvas y SVG. Los textos son una propuesta editorial para revisar.

La red de modales incluye introducción, escritura, voces, confirmación, retrato y contexto. Los textos se guardan únicamente en localStorage del navegador (hasta 20). El retrato se puede descargar como PNG. No hay publicación ni backend compartido.

## Cámara en vivo

Hacer mi retrato abre una pantalla con visor 16:9, vista original pequeña, paletas térmica y ceniza, contraste y grano. Prender cámara solicita acceso únicamente a video. El procesamiento sucede en Canvas dentro del navegador; las imágenes no se suben. Se puede congelar y guardar un PNG. Cerrar la pantalla, cambiar de modal o dejar la pestaña apaga la cámara. Se muestra una composición tipográfica mientras está apagada. El efecto responde al brillo, no mide temperatura.



## Grafismos y deformación

Los trazos complementarios de handmarks.js son nuevos para la web, inspirados en los afiches aplanados de Figma; no son extracciones de esos originales. Se aplican sobre las fotos y en el puente entre secciones.

La cámara usa displacement.js para deformar los píxeles con ondas, refracción acanalada y un desgarro móvil. El control Deformación regula la amplitud; cursor y toque desplazan el centro del campo. Ceniza es el tratamiento inicial y Térmico sigue disponible. Probar con una foto usa la imagen de retrato del proyecto, sin acceder a la webcam. Congelar detiene también la deformación y el PNG conserva el tratamiento.


## Red nodal local

Explorar la red abre un mapa de pantalla completa que se recorre arrastrando con mouse o dedo. Se pueden seleccionar registros, filtrar por tópico, acercar/alejar y consultar una lista accesible. La ficha explica cada vínculo por tópico o palabras compartidas.

Crear mi nodo permite escribir una descarga, recibir una sugerencia de tópico y ver las palabras normalizadas antes de guardar. Los términos se agrupan por raíces y sinónimos definidos en network-core.js: por ejemplo cansancio, agotamiento y desgaste se vinculan como desgaste. Las conexiones tienen una regla explícita y no implican análisis semántico por IA.

El constructor de pensamientos cruza tópicos y hasta tres palabras. Muestra cuántos registros y tópicos respaldan cada palabra, conserva las fuentes y propone una frase editable. No atribuye una palabra a un tópico si sus registros no la contienen. Los pensamientos se recuperan desde Mis pensamientos y pueden descargarse como texto. El diseño de stencils queda para una sesión posterior.

Hay 14 registros de ejemplo claramente identificados. Los nodos propios y pensamientos se almacenan en este navegador, con topes de 60 y 30 respectivamente; no se comparten entre dispositivos ni personas. La comunidad en línea necesita almacenamiento compartido al publicar.
