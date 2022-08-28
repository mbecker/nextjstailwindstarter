import { Activity } from "../common/Strava";

export function dbDate(dt: string | Date): string {
  if (!(dt instanceof Date)) {
    dt = new Date(dt);
  }
  return dt.toISOString().slice(0, 19).replace("T", " ");
}

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

export function normalizeDate(dt: any): string {
  return new Date(dt).toLocaleDateString(undefined, options);
}

export function normalizeDateSplit(dt: any): string {
  const dts = new Date(dt).toLocaleDateString(undefined, options).split(", ");
  return dts[1] + "@" + dts[0];
}

export function normalizeMovingTime(dt: any): string {
  return `${new Date((dt as number) * 1000).toISOString().substring(11, 16)}h`;
}

export function normalizeDistance(n: any): string {
  return `${((n as number) / 1000).toFixed(2)}km`;
}

export const defaultActivity: Activity = {
  id: 7693442326,
  external_id: "garmin_ping_236244807329",
  upload_id: 8211470113,
  athlete: {
    id: 8844168,
    firstname: "",
    lastname: "",
    profile_medium: "",
    profile: "",
    city: "",
    state: "",
    country: "",
    sex: "",
    friend: "",
    follower: "",
    premium: false,
    created_at: "0001-01-01T00:00:00Z",
    updated_at: "0001-01-01T00:00:00Z",
    approve_followers: false,
    badge_type_id: 0,
  },
  name: "Fahrt am Morgen",
  distance: 85919,
  moving_time: 11300,
  elapsed_time: 11300,
  total_elevation_gain: 800,
  type: "Ride",
  start_date: "2022-08-21T06:59:44Z",
  start_date_local: "2022-08-21T08:59:44Z",
  time_zone: "",
  start_latlng: [47.57107545621693, 10.199086451902986],
  end_latlng: [47.57196159102023, 10.197592712938786],
  location_city: "",
  location_state: "",
  location_country: "Germany",
  achievement_count: 44,
  kudos_count: 5,
  comment_count: 0,
  athlete_count: 3,
  photo_count: 0,
  map: {
    id: "a7693442326",
    polyline: "",
    summary_polyline:
      "efjaHg_g}@c@wH`U_HrQqf@~KaMbF}BlAu`@kB_BCgDcHoAuAeM{HqSaGqKoHeCqE_LaEkCwEuWiKoCsF~EoDoEuKyXFaOyMkEqTxDeF_@ekA}dAkOqEkSqLe@xKmGdRkBvOmJrK_NtDaSkEiFnHqIxDsB~J}CyBy@vC_E|Ay]mLqU}NsLgCkF|KoJvIbAzJaAlPh@~KcCm@qKsYqNyZuN{Ma@p@nAjF~H|N@hG}FhBwDgFkFdC{B}ByC`FiGqBqFpDeBtDgBlQx@hOlBdEpA}@f@fE]t`@uBtIwGdHNpJcBd@}EzJ{EjBiBbEhCjm@e@x[eBlRzJp_A}AnJZtOqB|UzIpRjAlHFlYlBpMdAtYdHfPrQ~eAfKbYYdF}GlFlDhMmCfOyDnc@bDfj@_BhFgEng@iDtRVrUjBvGpBjUgCpYl@dUu@zTdC|Ra@xX`_@rExH~R~OrS|ExChArF`FjGl@rErC|E~JkEpS}\\bLkj@dF}Crp@}}@|s@el@fIkRjRis@xDiWIcHrOwEpCcGhIce@fDizB~CcV^et@uGmPcBiVj@iFhEqOkBw^jAkFzG_FhGQjBbC|@]eBeF_A_N~@yVtH_HjGoPrNuOrJ{ElB}HnDkD|BgHhB~@rEjKxEfA`AfInDzEzI@rE}Dv\\wJ|Qeg@jKgLlFgCjAg`@kB{AM_EcHuAgBuNaPi^}GwB}DgKeGiFsD{UoKkCmFxEuEyFyJcXBmNmNkEiRtDgIq@acAy_AmTcI{SiM}@dAI`JmFnO_E~TaJvI}JrCkUeEiFxHkHpCoCzK}BeCiAvCoFzAe\\aLeUuNmLyCaFvJuKhK`AzI_ApOl@pMiCw@aKmXiO_\\eNkMYxAfAlEpHvM@nHuF`B}DmFaFfCoB{B}C~EkGqBqFfDoBdF{A~Ot@|OdBrDlAk@h@|Ca@j`@wAdJmHlIT|IqBt@yEtJ_FnBaB`EfCjk@a@j\\kBdSzJj`AyAdJ^dNuBtWhI`QpAzGTrZfBlMbAxY|GtO|QpfAhKnY]pFuG`FvCrHTbEsChNwDha@hDxj@oBzHeEtg@_DdPRrVpBfHnBzTiChZn@nVw@|Q`CjQOr\\z^pD`HdRnPbTxEnCzApGnEpF~AlH|A`CjBQtHgElSg]bK{h@jFiDdp@s}@`k@mb@`I}IvH_R`Rir@hEaYQkGrQ{G`EwUpEuRhDoyBbDuVUcX~@gYi@mFsF}LeBaUpF{UsA_UJuNtIgIjGMjC|BuCmVbAoVdIqHlGqP`O}OlIuDrBmInDcDfBqGlBXlFnLnEz@`ArIzCtE`JB~DoDzFaAzAxEqEvI",
  },
  trainer: false,
  commute: false,
  manual: false,
  private: false,
  flagged: false,
  gear_id: "",
  average_speed: 7.603,
  max_speed: 17.508,
  average_cadence: 0,
  average_temp: 19,
  average_watts: 168.4,
  weighted_average_watts: 0,
  kilojoules: 1902.6,
  device_watts: false,
  average_heartrate: 0,
  max_heartrate: 0,
  truncated: 0,
  has_kudoed: false,
};
