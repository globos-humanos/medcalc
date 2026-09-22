// src/calculators/index.js

// =========================
// GENERAL
// =========================
import bmi from './general/bmi'
import bsa from './general/bsa'
import ibw from './general/ibw'
import adjustedBw from './general/adjusted-bw'
import leanBw from './general/lean-bw'
import apgar from './general/apgar'
import news2 from './general/news2'
import mews from './general/mews'
import braden from './general/braden'
import morse from './general/morse'
import katz from './general/katz-adl'
import barthel from './general/barthel'
import charlson from './general/charlson'
import elixhauser from './general/elixhauser'
import bsaMosteller from './general/bsa-mosteller'
import ibwDevine from './general/ibw-devine'
import leanBwJames from './general/lean-bw-james'
import waterlow from './general/waterlow'

// =========================
// CARDIOLOGY
// =========================
import cha2ds2Vasc from './cardiology/cha2ds2-vasc'
import crusade from './cardiology/crusade'
import dapt from './cardiology/dapt'
import dukeTreadmill from './cardiology/duke-treadmill'
import framingham from './cardiology/framingham'
import grace from './cardiology/grace'
import h2fpef from './cardiology/h2fpef'
import hasBled from './cardiology/has-bled'
import heart from './cardiology/heart'
import killip from './cardiology/killip'
import maggic from './cardiology/maggic'
import preciseDapt from './cardiology/precise-dapt'
import qrisk3 from './cardiology/qrisk3'
import seattleHf from './cardiology/seattle-hf'
import sgarbossa from './cardiology/sgarbossa'
import timiUaNstemi from './cardiology/timi-ua-nstemi'

// =========================
// EMERGENCY / TRAUMA
// =========================
import air from './emergency/air'
import alvarado from './emergency/alvarado'
import canadianCspine from './emergency/canadian-cspine'
import fast from './emergency/fast'
import iss from './emergency/iss'
import lrineq from './emergency/lrineq'
import modifiedShockIndex from './emergency/modified-shock-index'
import nexus from './emergency/nexus'
import niss from './emergency/niss'
import ottawaAnkle from './emergency/ottawa-ankle'
import ottawaKnee from './emergency/ottawa-knee'
import percEmergency from './emergency/perc'
import revisedGenevaEmergency from './emergency/revised-geneva'
import ripasa from './emergency/ripasa'
import rts from './emergency/rts'
import shockIndex from './emergency/shock-index'
import triss from './emergency/triss'
import wellsDvt from './emergency/wells-dvt'
import wellsPe from './emergency/wells-pe'

// =========================
// ENDOCRINOLOGY
// =========================
import ascvd from './endocrinology/ascvd'
import caCrClearanceRatio from './endocrinology/ca-cr-clearance-ratio'
import findrisc from './endocrinology/findrisc'
import frax from './endocrinology/frax'
import homaBeta from './endocrinology/homa-beta'
import homaIr from './endocrinology/homa-ir'
import quicki from './endocrinology/quicki'
import tScoreZScore from './endocrinology/t-score-z-score'

// =========================
// GASTROENTEROLOGY
// =========================
import aims65 from './gastro/aims65'
import apri from './gastro/apri'
import bisap from './gastro/bisap'
import childPugh from './gastro/child-pugh'
import ctsi from './gastro/ctsi'
import fib4 from './gastro/fib4'
import glasgowBlatchford from './gastro/glasgow-blatchford'
import glasgowImrie from './gastro/glasgow-imrie'
import haps from './gastro/haps'
import lille from './gastro/lille'
import maddreyDf from './gastro/maddrey-df'
import meld3 from './gastro/meld-3'
import meldNa from './gastro/meld-na'
import meld from './gastro/meld'
import nafldFibrosis from './gastro/nafld-fibrosis'
import ranson from './gastro/ranson'
import rockall from './gastro/rockall'

// =========================
// HEMATOLOGY / ONCOLOGY
// =========================
import fourTs from './hematology/4ts'
import anc from './hematology/anc'
import caprini from './hematology/caprini'
import cisne from './hematology/cisne'
import cllIpi from './hematology/cll-ipi'
import correctedRetic from './hematology/corrected-retic'
import flipi from './hematology/flipi'
import hasenclever from './hematology/hasenclever'
import hscore from './hematology/hscore'
import improveBleeding from './hematology/improve-bleeding'
import improveVte from './hematology/improve-vte'
import ipi from './hematology/ipi'
import ipssM from './hematology/ipss-m'
import ipssR from './hematology/ipss-r'
import istDic from './hematology/ist-dic'
import khorana from './hematology/khorana'
import mascc from './hematology/mascc'
import mentzer from './hematology/mentzer'
import padua from './hematology/padua'
import rIpi from './hematology/r-ipi'
import rdwIndex from './hematology/rdw-index'
import reticIndex from './hematology/retic-index'
import shineLal from './hematology/shine-lal'

// =========================
// ICU
// =========================
import apacheII from './icu/apache-ii'
import apacheIII from './icu/apache-iii'
import apacheIV from './icu/apache-iv'
import camIcu from './icu/cam-icu'
import cpot from './icu/cpot'
import lods from './icu/lods'
import mods from './icu/mods'
import mpm from './icu/mpm'
import mrcSum from './icu/mrc-sum'
import nutric from './icu/nutric'
import pelod2 from './icu/pelod-2'
import pim from './icu/pim'
import prism from './icu/prism'
import rass from './icu/rass'
import sapsII from './icu/saps-ii'
import sapsIII from './icu/saps-iii'
import sofa from './icu/sofa'
import tiss28 from './icu/tiss-28'

// =========================
// INFECTIOUS DISEASE
// =========================
import centor from './infectious/centor'
import duke from './infectious/duke'
import feverpain from './infectious/feverpain'
import mcisaac from './infectious/mcisaac'
import meds from './infectious/meds'
import modifiedDuke from './infectious/modified-duke'
import piro from './infectious/piro'
import pitt from './infectious/pitt'
import qsofa from './infectious/qsofa'
import sirs from './infectious/sirs'

// =========================
// NEPHROLOGY
// =========================
import anionGap from './nephrology/anion-gap'
import bunCr from './nephrology/bun-cr'
import calciumPhosphateProduct from './nephrology/calcium-phosphate-product'
import ckdEpi from './nephrology/ckd-epi'
import cockcroftGault from './nephrology/cockcroft-gault'
import correctedCalcium from './nephrology/corrected-calcium'
import correctedSodium from './nephrology/corrected-sodium'
import deltaGap from './nephrology/delta-gap'
import fek from './nephrology/fek'
import fena from './nephrology/fena'
import feurea from './nephrology/feurea'
import freeWaterDeficit from './nephrology/free-water-deficit'
import kfre from './nephrology/kfre'
import ktv from './nephrology/ktv'
import mdrd from './nephrology/mdrd'
import osmolarGap from './nephrology/osmolar-gap'
import schwartz from './nephrology/schwartz'
import serumOsmolality from './nephrology/serum-osmolality'
import tbw from './nephrology/tbw'
import ttkg from './nephrology/ttkg'
import urineAnionGap from './nephrology/urine-anion-gap'
import urr from './nephrology/urr'

// =========================
// NEUROLOGY
// =========================
import abcd2 from './neurology/abcd2'
import canadianCtHead from './neurology/canadian-ct-head'
import fisher from './neurology/fisher'
import four from './neurology/four'
import gcs from './neurology/gcs'
import huntHess from './neurology/hunt-hess'
import ich from './neurology/ich'
import marshallCt from './neurology/marshall-ct'
import modifiedFisher from './neurology/modified-fisher'
import mrs from './neurology/mrs'
import newOrleans from './neurology/new-orleans'
import nihss from './neurology/nihss'
import pecarn from './neurology/pecarn'
import rotterdam from './neurology/rotterdam'
import wfns from './neurology/wfns'

// =========================
// OBGYN
// =========================
import bishop from './obgyn/bishop'
import carpreg2 from './obgyn/carpreg2'
import edd from './obgyn/edd'
import figoStaging from './obgyn/figo-staging'
import fullPiers from './obgyn/full-piers'
import gestationalAge from './obgyn/gestational-age'
import modifiedWho from './obgyn/modified-who'
import partograph from './obgyn/partograph'
import piers from './obgyn/piers'
import preeclampsiaRisk from './obgyn/preeclampsia-risk'
import sflt1Plgf from './obgyn/sflt1-plgf'
import yearsPregnancy from './obgyn/years-pregnancy'
import zahara from './obgyn/zahara'

// =========================
// PEDIATRICS
// =========================
import ballard from './pediatrics/ballard'
import bayley from './pediatrics/bayley'
import bmiForAge from './pediatrics/bmi-for-age'
import downes from './pediatrics/downes'
import dubowitz from './pediatrics/dubowitz'
import mchat from './pediatrics/mchat'
import mcisaacPeds from './pediatrics/mcisaac'
import muac from './pediatrics/muac'
import pediatricAppendicitis from './pediatrics/pediatric-appendicitis'
import pediatricAsthma from './pediatrics/pediatric-asthma'
import pediatricGcs from './pediatrics/pediatric-gcs'
import pediatricSofa from './pediatrics/pediatric-sofa'
import pediatricPelod2 from './pediatrics/pelod-2'
import pediatricPim from './pediatrics/pim'
import pediatricPrismIII from './pediatrics/prism-iii'
import silverman from './pediatrics/silverman'
import tal from './pediatrics/tal'
import westleyCroup from './pediatrics/westley-croup'
import woodDownes from './pediatrics/wood-downes'
import yale from './pediatrics/yale'

// =========================
// RESPIRATORY
// =========================
import aaGradient from './respiratory/aagradient'
import alveolarGasEquation from './respiratory/alveolar-gas-equation'
import bode from './respiratory/bode'
import cao2 from './respiratory/cao2'
import crb65 from './respiratory/crb65'
import curb65 from './respiratory/curb-65'
import decaf from './respiratory/decaf'
import goldCopd from './respiratory/gold-copd'
import hacor from './respiratory/hacor'
import metabolicAlkalosis from './respiratory/metabolic-alkalosis'
import murray from './respiratory/murray'
import pao2fio2 from './respiratory/pao2fio2'
import pesi from './respiratory/pesi'
import psi from './respiratory/psi'
import roX from './respiratory/roX'
import sfio2 from './respiratory/sfio2'
import smartCop from './respiratory/smart-cop'
import spesi from './respiratory/spesi'
import stopbang from './respiratory/stopbang'
import winter from './respiratory/winter'
import years from './respiratory/years'

// =========================
// SURGERY / PERIOPERATIVE
// =========================
import acsNsqip from './surgery/acs-nsqip'
import ariscat from './surgery/ariscat'
import asa from './surgery/asa'
import frailty from './surgery/frailty'
import frailtyIndex from './surgery/frailty-index'
import guptaMica from './surgery/gupta-mica'
import must from './surgery/must'
import nrs2002 from './surgery/nrs2002'
import possums from './surgery/possums'
import pPossumSurgery from './surgery/p-possum'
import rcri from './surgery/rcri'
import snaq from './surgery/snaq'
import surgicalApgar from './surgery/surgical-apgar'

// =========================
// CALCULATOR REGISTRY
// =========================

export const calculators = [
  // General
  bmi,
  bsa,
  ibw,
  adjustedBw,
  leanBw,
  apgar,
  news2,
  mews,
  braden,
  morse,
  katz,
  barthel,
  charlson,
  elixhauser,
  bsaMosteller,
  ibwDevine,
  leanBwJames,
  waterlow,

  // Cardiology
  cha2ds2Vasc,
  crusade,
  dapt,
  dukeTreadmill,
  framingham,
  grace,
  h2fpef,
  hasBled,
  heart,
  killip,
  maggic,
  preciseDapt,
  qrisk3,
  seattleHf,
  sgarbossa,
  timiUaNstemi,

  // Emergency / Trauma
  air,
  alvarado,
  canadianCspine,
  fast,
  iss,
  lrineq,
  modifiedShockIndex,
  nexus,
  niss,
  ottawaAnkle,
  ottawaKnee,
  percEmergency,
  revisedGenevaEmergency,
  ripasa,
  rts,
  shockIndex,
  triss,
  wellsDvt,
  wellsPe,

  // Endocrinology
  ascvd,
  caCrClearanceRatio,
  findrisc,
  frax,
  homaBeta,
  homaIr,
  quicki,
  tScoreZScore,

  // Gastroenterology
  aims65,
  apri,
  bisap,
  childPugh,
  ctsi,
  fib4,
  glasgowBlatchford,
  glasgowImrie,
  haps,
  lille,
  maddreyDf,
  meld3,
  meldNa,
  meld,
  nafldFibrosis,
  ranson,
  rockall,

  // Hematology / Oncology
  fourTs,
  anc,
  caprini,
  cisne,
  cllIpi,
  correctedRetic,
  flipi,
  hasenclever,
  hscore,
  improveBleeding,
  improveVte,
  ipi,
  ipssM,
  ipssR,
  istDic,
  khorana,
  mascc,
  mentzer,
  padua,
  rIpi,
  rdwIndex,
  reticIndex,
  shineLal,

  // ICU
  apacheII,
  apacheIII,
  apacheIV,
  camIcu,
  cpot,
  lods,
  mods,
  mpm,
  mrcSum,
  nutric,
  pelod2,
  pim,
  prism,
  rass,
  sapsII,
  sapsIII,
  sofa,
  tiss28,

  // Infectious Disease
  centor,
  duke,
  feverpain,
  mcisaac,
  meds,
  modifiedDuke,
  piro,
  pitt,
  qsofa,
  sirs,

  // Nephrology
  anionGap,
  bunCr,
  calciumPhosphateProduct,
  ckdEpi,
  cockcroftGault,
  correctedCalcium,
  correctedSodium,
  deltaGap,
  fek,
  fena,
  feurea,
  freeWaterDeficit,
  kfre,
  ktv,
  mdrd,
  osmolarGap,
  schwartz,
  serumOsmolality,
  tbw,
  ttkg,
  urineAnionGap,
  urr,

  // Neurology
  abcd2,
  canadianCtHead,
  fisher,
  four,
  gcs,
  huntHess,
  ich,
  marshallCt,
  modifiedFisher,
  mrs,
  newOrleans,
  nihss,
  pecarn,
  rotterdam,
  wfns,

  // OBGYN
  bishop,
  carpreg2,
  edd,
  figoStaging,
  fullPiers,
  gestationalAge,
  modifiedWho,
  partograph,
  piers,
  preeclampsiaRisk,
  sflt1Plgf,
  yearsPregnancy,
  zahara,

  // Pediatrics
  ballard,
  bayley,
  bmiForAge,
  downes,
  dubowitz,
  mchat,
  mcisaacPeds,
  muac,
  pediatricAppendicitis,
  pediatricAsthma,
  pediatricGcs,
  pediatricSofa,
  pediatricPelod2,
  pediatricPim,
  pediatricPrismIII,
  silverman,
  tal,
  westleyCroup,
  woodDownes,
  yale,

  // Respiratory
  aaGradient,
  alveolarGasEquation,
  bode,
  cao2,
  crb65,
  curb65,
  decaf,
  goldCopd,
  hacor,
  metabolicAlkalosis,
  murray,
  pao2fio2,
  pesi,
  psi,
  roX,
  sfio2,
  smartCop,
  spesi,
  stopbang,
  winter,
  years,

  // Surgery / Perioperative
  acsNsqip,
  ariscat,
  asa,
  frailty,
  frailtyIndex,
  guptaMica,
  must,
  nrs2002,
  possums,
  pPossumSurgery,
  rcri,
  snaq,
  surgicalApgar
]

export function getCalculatorById(id) {
  return calculators.find(
    calculator => calculator.id === id
  )
}
