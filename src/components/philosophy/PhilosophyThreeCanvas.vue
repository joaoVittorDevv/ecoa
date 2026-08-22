<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as THREE from 'three'
import anime from 'animejs'

const props = defineProps({
  chapter: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['trigger-advance'])

const containerRef = ref(null)

let scene, camera, renderer
let animationFrameId = null
let clock = new THREE.Clock()

let chapterGroups = []

// Objetos específicos de cada capítulo
// Cap 1: Casulo Têxtil, Tecido Ondulante e Filamentos de Linho
let cap1Group, clothMesh, clothGeometry, sproutingCurves = [], cap1CoreLight
// Cap 2: Cabide Vintage e Prismas Ópticos de Curadoria
let cap2Group, hangerGroup, opticalPlates = [], cap2FocalLight
// Cap 3: Gota de Ozônio Fluida, Núcleo e Partículas Efervescentes
let cap3Group, crystalMesh, crystalCore, vaporParticles, cap3OriginalPositions
// Cap 4: Fita Helicoidal Cinética de Möbius Zaha Hadid
let cap4Group, helicalMesh, ribbonMesh, helixVelocity = 0.45
// Cap 5: Monólito Portal Ecoa e Anéis Orbitais de Luz
let cap5Group, monolithGroup, portalRings = [], monolithStripe, monolithLight

// Sistema de Interatividade e Ponteiro
const raycaster = new THREE.Raycaster()
raycaster.params.Points.threshold = 0.5
const pointer = new THREE.Vector2(0, 0)
let mouseX = 0, mouseY = 0
let targetMouseX = 0, targetMouseY = 0
let isHovered = false
let isInteracting = false

function initThree() {
  if (!containerRef.value) return

  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight
  const isMobile = width < 640

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
  camera.position.set(0, 0, isMobile ? 8.6 : 7.2)

  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.25

  containerRef.value.appendChild(renderer.domElement)

  // Iluminação Escultural Quente de Galeria
  const ambientLight = new THREE.AmbientLight(0xfff6eb, 1.8)
  scene.add(ambientLight)

  const spotLight1 = new THREE.SpotLight(0xc86d51, 4.0, 22, Math.PI / 4, 0.5)
  spotLight1.position.set(6, 6, 6)
  scene.add(spotLight1)

  const spotLight2 = new THREE.SpotLight(0x3a4d39, 3.0, 22, Math.PI / 4, 0.5)
  spotLight2.position.set(-6, -5, 5)
  scene.add(spotLight2)

  // Criar os 5 grupos de capítulos
  for (let i = 0; i < 5; i++) {
    const grp = new THREE.Group()
    grp.visible = (i + 1 === props.chapter)
    scene.add(grp)
    chapterGroups.push(grp)
  }

  setupChapter1_Cloth(chapterGroups[0])
  setupChapter2_Hanger(chapterGroups[1])
  setupChapter3_Crystal(chapterGroups[2])
  setupChapter4_Helix(chapterGroups[3])
  setupChapter5_Monolith(chapterGroups[4])

  // Listeners de Janela e Ponteiro Unificado
  window.addEventListener('resize', onWindowResize)
  const dom = renderer.domElement
  dom.addEventListener('pointermove', onPointerMove, { passive: true })
  dom.addEventListener('pointerdown', onPointerDown)
  dom.addEventListener('pointerup', onPointerUp)
  dom.addEventListener('pointerleave', onPointerLeave)

  animate()
}

// ----------------------------------------------------------------------
// CAPÍTULO 1: GERMINAÇÃO TÊXTIL (A Fibra e o Solo)
// ----------------------------------------------------------------------
function setupChapter1_Cloth(group) {
  cap1Group = new THREE.Group()
  group.add(cap1Group)

  // 1. Malha de Tecido de Linho Cru com Ondulação Senoidal
  clothGeometry = new THREE.PlaneGeometry(3.6, 2.4, 36, 36)
  const clothMat = new THREE.MeshStandardMaterial({
    color: 0xf4efea,
    roughness: 0.65,
    metalness: 0.05,
    side: THREE.DoubleSide
  })
  clothMesh = new THREE.Mesh(clothGeometry, clothMat)
  clothMesh.rotation.x = -Math.PI / 6
  clothMesh.rotation.y = Math.PI / 8
  cap1Group.add(clothMesh)

  // 2. Luz de Respiração da Germinação
  cap1CoreLight = new THREE.PointLight(0xc86d51, 2.5, 6)
  cap1CoreLight.position.set(0, -1.0, 0.8)
  cap1Group.add(cap1CoreLight)

  // 3. Filamentos Orgânicos de Linho e Algodão Brotando
  sproutingCurves = []
  for (let f = 0; f < 5; f++) {
    const angle = (f / 5) * Math.PI * 2
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(Math.cos(angle) * 0.4, -1.4, Math.sin(angle) * 0.3),
      new THREE.Vector3(Math.cos(angle) * 0.8, -0.6 + f * 0.2, Math.sin(angle) * 0.5),
      new THREE.Vector3(Math.sin(angle) * 1.2, 0.4 + f * 0.3, Math.cos(angle) * 0.6),
      new THREE.Vector3(Math.cos(angle) * 1.6, 1.4 - f * 0.2, Math.sin(angle) * 0.4)
    ])
    const tubeGeo = new THREE.TubeGeometry(curve, 36, 0.038, 8, false)
    const tubeMat = new THREE.MeshStandardMaterial({
      color: f % 2 === 0 ? 0xc86d51 : 0x3a4d39,
      roughness: 0.35,
      metalness: 0.15
    })
    const tube = new THREE.Mesh(tubeGeo, tubeMat)
    cap1Group.add(tube)
    sproutingCurves.push(tube)
  }

  // 4. Casulo / Semente Central de Terracota
  const seedGeo = new THREE.SphereGeometry(0.55, 24, 24)
  seedGeo.scale(0.8, 1.4, 0.8)
  const seedMat = new THREE.MeshStandardMaterial({
    color: 0x3a4d39,
    roughness: 0.45,
    metalness: 0.2
  })
  const seedMesh = new THREE.Mesh(seedGeo, seedMat)
  seedMesh.position.set(0, -1.0, 0.4)
  cap1Group.add(seedMesh)
}

// ----------------------------------------------------------------------
// CAPÍTULO 2: ARQUEOLOGIA DO TEMPO (Garimpo e Lentes de Curadoria)
// ----------------------------------------------------------------------
function setupChapter2_Hanger(group) {
  cap2Group = new THREE.Group()
  group.add(cap2Group)

  hangerGroup = new THREE.Group()
  cap2Group.add(hangerGroup)

  // Barra de Madeira Nobre
  const barCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.8, -0.5, 0),
    new THREE.Vector3(0, 0.4, 0),
    new THREE.Vector3(1.8, -0.5, 0)
  ])
  const barGeo = new THREE.TubeGeometry(barCurve, 32, 0.12, 12, false)
  const barMat = new THREE.MeshStandardMaterial({ color: 0x3a4d39, roughness: 0.45 })
  const barMesh = new THREE.Mesh(barGeo, barMat)
  hangerGroup.add(barMesh)

  // Gancho Metálico Vintage em Latão
  const hookCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.4, 0),
    new THREE.Vector3(0, 1.3, 0),
    new THREE.Vector3(0.5, 1.6, 0),
    new THREE.Vector3(0.8, 1.3, 0)
  ])
  const hookGeo = new THREE.TubeGeometry(hookCurve, 24, 0.06, 8, false)
  const hookMat = new THREE.MeshStandardMaterial({ color: 0xc86d51, metalness: 0.85, roughness: 0.2 })
  const hookMesh = new THREE.Mesh(hookGeo, hookMat)
  hangerGroup.add(hookMesh)

  // Peça de Alfaiataria Nobre Suspensa
  const prismGeo = new THREE.OctahedronGeometry(1.0, 0)
  const prismMat = new THREE.MeshStandardMaterial({
    color: 0xf4efea,
    roughness: 0.25,
    metalness: 0.2
  })
  const prismMesh = new THREE.Mesh(prismGeo, prismMat)
  prismMesh.position.set(0, -1.0, 0)
  prismMesh.scale.set(0.85, 1.35, 0.6)
  hangerGroup.add(prismMesh)

  // Luz Focal de Descoberta
  cap2FocalLight = new THREE.PointLight(0xc86d51, 1.5, 8)
  cap2FocalLight.position.set(0, 0, 1.5)
  cap2Group.add(cap2FocalLight)

  // Lâminas / Prismas Ópticos Flutuantes de Curadoria
  opticalPlates = []
  for (let i = 0; i < 3; i++) {
    const plateGeo = new THREE.TorusGeometry(1.6 + i * 0.35, 0.04, 12, 48)
    const plateMat = new THREE.MeshPhysicalMaterial({
      color: i === 1 ? 0xc86d51 : 0x3a4d39,
      transmission: 0.85,
      opacity: 0.8,
      transparent: true,
      roughness: 0.1,
      metalness: 0.2,
      clearcoat: 1.0
    })
    const plate = new THREE.Mesh(plateGeo, plateMat)
    plate.rotation.x = (i * Math.PI) / 3
    plate.rotation.y = (i * Math.PI) / 4
    cap2Group.add(plate)
    opticalPlates.push(plate)
  }
}

// ----------------------------------------------------------------------
// CAPÍTULO 3: GOTA DE OZÔNIO & CURA (O Cuidado e a Cura)
// ----------------------------------------------------------------------
function setupChapter3_Crystal(group) {
  cap3Group = new THREE.Group()
  group.add(cap3Group)

  // Gota Fluida Translúcida de Ozônio
  const crystalGeo = new THREE.IcosahedronGeometry(1.6, 2)
  cap3OriginalPositions = crystalGeo.attributes.position.clone()

  const crystalMat = new THREE.MeshPhysicalMaterial({
    color: 0x3a4d39,
    roughness: 0.1,
    transmission: 0.88,
    thickness: 1.6,
    transparent: true,
    opacity: 0.92,
    reflectivity: 0.95,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    flatShading: false
  })
  crystalMesh = new THREE.Mesh(crystalGeo, crystalMat)
  cap3Group.add(crystalMesh)

  // Núcleo Radiante Interno em Terracota
  const coreGeo = new THREE.DodecahedronGeometry(0.75, 0)
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0xc86d51,
    emissive: 0xc86d51,
    emissiveIntensity: 0.6,
    roughness: 0.25
  })
  crystalCore = new THREE.Mesh(coreGeo, coreMat)
  cap3Group.add(crystalCore)

  // Sistema de 160 Partículas Efervescentes de Vapor de Ozônio
  const partGeo = new THREE.BufferGeometry()
  const count = 160
  const pos = new Float32Array(count * 3)
  for (let i = 0; i < count * 3; i += 3) {
    pos[i] = (Math.random() - 0.5) * 4.0
    pos[i + 1] = (Math.random() - 0.5) * 4.0
    pos[i + 2] = (Math.random() - 0.5) * 4.0
  }
  partGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  const partMat = new THREE.PointsMaterial({
    size: 0.06,
    color: 0xc86d51,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending
  })
  vaporParticles = new THREE.Points(partGeo, partMat)
  cap3Group.add(vaporParticles)
}

// ----------------------------------------------------------------------
// CAPÍTULO 4: FITA HELICOIDAL INFINITA (A Permanência Infinita)
// ----------------------------------------------------------------------
function setupChapter4_Helix(group) {
  cap4Group = new THREE.Group()
  group.add(cap4Group)

  // Escultura Principal em Nó de Trevo (Zaha Hadid)
  const helixGeo = new THREE.TorusKnotGeometry(1.35, 0.22, 120, 20, 2, 3)
  const helixMat = new THREE.MeshStandardMaterial({
    color: 0x3a4d39,
    roughness: 0.3,
    metalness: 0.3
  })
  helicalMesh = new THREE.Mesh(helixGeo, helixMat)
  cap4Group.add(helicalMesh)

  // Fita de Luz Secundária Entrelaçada
  const knot2Geo = new THREE.TorusKnotGeometry(1.35, 0.07, 100, 16, 3, 4)
  const knot2Mat = new THREE.MeshStandardMaterial({
    color: 0xc86d51,
    emissive: 0xc86d51,
    emissiveIntensity: 0.45,
    roughness: 0.2
  })
  ribbonMesh = new THREE.Mesh(knot2Geo, knot2Mat)
  helicalMesh.add(ribbonMesh)
}

// ----------------------------------------------------------------------
// CAPÍTULO 5: MONÓLITO PORTAL ECOA (O Manifesto Ecoa)
// ----------------------------------------------------------------------
function setupChapter5_Monolith(group) {
  cap5Group = new THREE.Group()
  group.add(cap5Group)

  monolithGroup = new THREE.Group()
  cap5Group.add(monolithGroup)

  // Monólito Esculpido em Cerâmica Nobre
  const monoGeo = new THREE.BoxGeometry(1.2, 2.6, 0.42)
  const monoMat = new THREE.MeshStandardMaterial({
    color: 0x3a4d39,
    roughness: 0.25,
    metalness: 0.25
  })
  const monoMesh = new THREE.Mesh(monoGeo, monoMat)
  monoMesh.rotation.y = Math.PI / 6
  monolithGroup.add(monoMesh)

  // Fenda de Luz Terracota Cortando o Monólito
  const stripeGeo = new THREE.BoxGeometry(1.24, 0.22, 0.46)
  const stripeMat = new THREE.MeshStandardMaterial({
    color: 0xc86d51,
    emissive: 0xc86d51,
    emissiveIntensity: 0.55
  })
  monolithStripe = new THREE.Mesh(stripeGeo, stripeMat)
  monoMesh.add(monolithStripe)

  // Luz do Portal
  monolithLight = new THREE.PointLight(0xc86d51, 3.0, 8)
  monolithLight.position.set(0, 0, 1.2)
  monolithGroup.add(monolithLight)

  // 3 Anéis Orbitais Concéntricos de Luz
  portalRings = []
  for (let r = 0; r < 3; r++) {
    const ringGeo = new THREE.TorusGeometry(1.75 + r * 0.42, 0.028, 16, 72)
    const ringMat = new THREE.MeshStandardMaterial({
      color: r % 2 === 0 ? 0xc86d51 : 0x3a4d39,
      emissive: r % 2 === 0 ? 0xc86d51 : 0x3a4d39,
      emissiveIntensity: 0.35 - r * 0.08,
      transparent: true,
      opacity: 0.8 - r * 0.15
    })
    const ringMesh = new THREE.Mesh(ringGeo, ringMat)
    ringMesh.rotation.x = Math.PI / (2.5 + r * 0.5)
    monolithGroup.add(ringMesh)
    portalRings.push(ringMesh)
  }
}

// ----------------------------------------------------------------------
// RENDER LOOP & DINÂMICA VIVA RESPONSIVA
// ----------------------------------------------------------------------
function animate() {
  animationFrameId = requestAnimationFrame(animate)

  const t = clock.getElapsedTime()

  // Interpolação suave do mouse/touch com amortecimento
  mouseX += (targetMouseX - mouseX) * 0.06
  mouseY += (targetMouseY - mouseY) * 0.06

  const hoverFactor = isHovered ? 1.4 : 1.0

  // --------------------------------------------------------------------
  // ANIMAÇÃO CAPÍTULO 1 (Respiração Orgânica & Ondas de Linho)
  // --------------------------------------------------------------------
  if (props.chapter === 1 && clothGeometry && cap1Group) {
    const pos = clothGeometry.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const u = pos.getX(i)
      const v = pos.getY(i)
      const z = Math.sin(u * 1.6 + t * (1.8 * hoverFactor)) * 0.26 +
                Math.cos(v * 1.9 + t * (1.4 * hoverFactor)) * 0.19
      pos.setZ(i, z)
    }
    clothGeometry.computeVertexNormals()
    clothGeometry.attributes.position.needsUpdate = true

    clothMesh.rotation.y = (Math.PI / 8) + mouseX * 0.35
    clothMesh.rotation.x = (-Math.PI / 6) + mouseY * 0.35

    if (cap1CoreLight) {
      cap1CoreLight.intensity = 2.0 + Math.sin(t * 2.2) * 0.8 * hoverFactor
    }

    sproutingCurves.forEach((sp, idx) => {
      sp.rotation.y = Math.sin(t * 0.8 + idx) * 0.15 + mouseX * 0.2
      sp.position.y = Math.sin(t * 1.2 + idx * 0.5) * 0.08
    })
  }

  // --------------------------------------------------------------------
  // ANIMAÇÃO CAPÍTULO 2 (Alinhamento das Lentes de Garimpo)
  // --------------------------------------------------------------------
  else if (props.chapter === 2 && hangerGroup && cap2Group) {
    hangerGroup.rotation.y = Math.sin(t * 0.5) * 0.35 + mouseX * 0.55
    hangerGroup.position.y = Math.sin(t * 1.1) * 0.12 + mouseY * 0.15

    opticalPlates.forEach((pl, idx) => {
      pl.rotation.z = t * (0.2 + idx * 0.1) + mouseX * (0.3 + idx * 0.2)
      pl.rotation.x = (idx * Math.PI) / 3 + mouseY * 0.25
    })

    if (cap2FocalLight) {
      cap2FocalLight.intensity = isHovered ? 3.2 : 1.6 + Math.sin(t * 1.8) * 0.5
    }
  }

  // --------------------------------------------------------------------
  // ANIMAÇÃO CAPÍTULO 3 (Deformação Fluida & Microvapor de Ozônio)
  // --------------------------------------------------------------------
  else if (props.chapter === 3 && crystalMesh && crystalCore && cap3Group) {
    crystalMesh.rotation.y = t * 0.32 + mouseX * 0.45
    crystalMesh.rotation.x = t * 0.18 + mouseY * 0.45

    // Deformação suave na superfície da gota viva
    if (crystalMesh.geometry && cap3OriginalPositions) {
      const p = crystalMesh.geometry.attributes.position
      const orig = cap3OriginalPositions
      for (let i = 0; i < p.count; i++) {
        const ox = orig.getX(i)
        const oy = orig.getY(i)
        const oz = orig.getZ(i)
        const wave = 1.0 + Math.sin(ox * 2.0 + t * 2.4) * 0.06 * hoverFactor
        p.setXYZ(i, ox * wave, oy * wave, oz * wave)
      }
      crystalMesh.geometry.computeVertexNormals()
      p.needsUpdate = true
    }

    crystalCore.rotation.y = -t * 0.6
    crystalCore.rotation.z = t * 0.4
    crystalCore.scale.setScalar(1.0 + Math.sin(t * 3.0) * 0.08 * hoverFactor)

    if (vaporParticles) {
      vaporParticles.rotation.y = t * 0.15
      vaporParticles.rotation.x = Math.sin(t * 0.2) * 0.1
    }
  }

  // --------------------------------------------------------------------
  // ANIMAÇÃO CAPÍTULO 4 (Fita Cinética Inercial Zaha Hadid)
  // --------------------------------------------------------------------
  else if (props.chapter === 4 && helicalMesh && cap4Group) {
    const targetVel = isHovered ? 0.95 : 0.45
    helixVelocity += (targetVel - helixVelocity) * 0.05

    helicalMesh.rotation.x += 0.008 * helixVelocity + mouseY * 0.02
    helicalMesh.rotation.y += 0.012 * helixVelocity + mouseX * 0.02
    helicalMesh.rotation.z = Math.sin(t * 0.6) * 0.25
  }

  // --------------------------------------------------------------------
  // ANIMAÇÃO CAPÍTULO 5 (Monólito Portal Ecoa & Anéis Cósmicos)
  // --------------------------------------------------------------------
  else if (props.chapter === 5 && monolithGroup && cap5Group) {
    monolithGroup.rotation.y = t * 0.22 + mouseX * 0.35
    monolithGroup.position.y = Math.sin(t * 0.9) * 0.09

    portalRings.forEach((ring, idx) => {
      ring.rotation.z = t * (0.3 + idx * 0.15) * (idx % 2 === 0 ? 1 : -1)
      ring.rotation.y = mouseX * 0.4
    })

    if (monolithStripe && monolithStripe.material) {
      monolithStripe.material.emissiveIntensity = 0.5 + Math.sin(t * 2.5) * 0.35 * hoverFactor
    }

    if (monolithLight) {
      monolithLight.intensity = isHovered ? 4.5 : 2.5 + Math.sin(t * 2.0) * 1.0
    }
  }

  if (renderer && scene && camera) {
    renderer.render(scene, camera)
  }
}

// ----------------------------------------------------------------------
// SISTEMA DE PONTEIRO & EVENTOS UNIFICADOS (WEB & MOBILE)
// ----------------------------------------------------------------------
function onPointerMove(e) {
  if (!containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  pointer.x = (x / rect.width) * 2 - 1
  pointer.y = -(y / rect.height) * 2 + 1

  targetMouseX = pointer.x
  targetMouseY = pointer.y

  if (!isHovered) {
    isHovered = true
  }
}

function onPointerDown(e) {
  isInteracting = true
  onPointerMove(e)

  // Feedback Háptico Visual: Escala elástica suave no capítulo ativo
  const activeGrp = chapterGroups[props.chapter - 1]
  if (activeGrp) {
    anime({
      targets: activeGrp.scale,
      x: 0.92,
      y: 0.92,
      z: 0.92,
      duration: 150,
      easing: 'easeOutQuad'
    })
  }
}

function onPointerUp() {
  if (!isInteracting) return
  isInteracting = false

  const activeGrp = chapterGroups[props.chapter - 1]
  if (activeGrp) {
    anime({
      targets: activeGrp.scale,
      x: 1.08,
      y: 1.08,
      z: 1.08,
      duration: 350,
      easing: 'easeOutBack',
      complete: () => {
        anime({
          targets: activeGrp.scale,
          x: 1.0,
          y: 1.0,
          z: 1.0,
          duration: 300,
          easing: 'easeOutQuad'
        })
      }
    })
  }

  // Emite o avanço de capítulo de forma imediata e fluida
  emit('trigger-advance')
}

function onPointerLeave() {
  isHovered = false
  targetMouseX = 0
  targetMouseY = 0
}

function onWindowResize() {
  if (!containerRef.value || !renderer || !camera) return
  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight
  const isMobile = width < 640

  camera.aspect = width / height
  camera.position.set(0, 0, isMobile ? 8.6 : 7.2)
  camera.updateProjectionMatrix()

  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2))
}

// Transição suave entre capítulos com Anime.js
watch(() => props.chapter, (newChap) => {
  chapterGroups.forEach((grp, idx) => {
    if (idx + 1 === newChap) {
      grp.visible = true
      grp.scale.set(0.4, 0.4, 0.4)
      anime({
        targets: grp.scale,
        x: 1,
        y: 1,
        z: 1,
        duration: 900,
        easing: 'easeOutBack'
      })
    } else {
      anime({
        targets: grp.scale,
        x: 0.1,
        y: 0.1,
        z: 0.1,
        duration: 350,
        easing: 'easeInQuad',
        complete: () => {
          grp.visible = false
        }
      })
    }
  })
})

onMounted(() => {
  initThree()
})

onUnmounted(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  window.removeEventListener('resize', onWindowResize)

  if (renderer && renderer.domElement) {
    const dom = renderer.domElement
    dom.removeEventListener('pointermove', onPointerMove)
    dom.removeEventListener('pointerdown', onPointerDown)
    dom.removeEventListener('pointerup', onPointerUp)
    dom.removeEventListener('pointerleave', onPointerLeave)

    renderer.dispose()
    if (dom.parentNode) {
      dom.parentNode.removeChild(dom)
    }
  }

  // Limpeza de geometrias e materiais para evitar vazamento de memória
  scene?.traverse((object) => {
    if (object.geometry) object.geometry.dispose()
    if (object.material) {
      if (Array.isArray(object.material)) {
        object.material.forEach((mat) => mat.dispose())
      } else {
        object.material.dispose()
      }
    }
  })
})
</script>

<template>
  <div
    ref="containerRef"
    class="w-full h-full relative cursor-pointer flex items-center justify-center select-none touch-none group"
    aria-label="Escultura 3D interativa da filosofia Ecoa"
  >
    <!-- Halo Luminoso Sutil de Affordance Orgânica ao Hover/Ativação -->
    <div
      class="absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-700 bg-gradient-radial from-terracotta/10 via-transparent to-transparent opacity-0 group-hover:opacity-100"
    ></div>
  </div>
</template>

<style scoped>
.touch-none {
  touch-action: none;
}
</style>
