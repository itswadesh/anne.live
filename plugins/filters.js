import Vue from 'vue'

Vue.filter('mask', function (value, clamp) {
  let out = ''
  value = value || ''
  const masked = value.substr(value.length - clamp)
  const remain = value.length - clamp
  for (let i = 0; i < remain; i++) out = out + 'X'
  return out + masked
})
Vue.directive('focus', {
  // When the bound element is inserted into the DOM...
  inserted(el) {
    // Focus the element
    el.focus()
  },
})
Vue.filter('date', function (value) {
  if (value) {
    const date = new Date(+value)
    return date.toLocaleDateString(['en-US'], {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }) // if you want, you can change locale date string
  }
})
Vue.filter('ago', function (dt) {
  const createdDate = new Date(dt)
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const year = createdDate.getFullYear()
  const month = months[createdDate.getMonth()]
  const date = createdDate.getDate()
  const hour = createdDate.getHours()
  const min = createdDate.getMinutes()
  const sec = createdDate.getSeconds()
  const time =
    date + ',' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec // final date with time, you can use this according your requirement
  return time
})
Vue.filter('currency', function (value, currency, decimals) {
  const digitsRE = /(\d{3})(?=\d)/g
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''
  currency = currency != null ? currency : '₹'
  decimals = decimals != null ? decimals : 0
  const stringified = Math.abs(value).toFixed(decimals)
  const _int = decimals ? stringified.slice(0, -1 - decimals) : stringified
  const i = _int.length % 3
  const head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : ''
  const _float = decimals ? stringified.slice(-1 - decimals) : ''
  const sign = value < 0 ? '-' : ''
  return (
    sign +
    currency +
    ' ' +
    head +
    _int.slice(i).replace(digitsRE, '$1,') +
    _float
  )
})
Vue.filter('titlecase', function (str) {
  if (str) {
    return str.replace(/\w\S*/g, function (txt) {
      let t
      if (txt && txt.substr(1)) {
        t = txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      } else {
        t = str
      }
      return t
    })
  }
})
Vue.filter('pluralize', function (noun) {
  if (typeof noun !== 'string') {
    return noun
  }

  const rules = [
    { regex: /octopus/gi, suffix: 'octopusses' },
    { regex: /person/gi, suffix: 'people' },
    { regex: /ox/gi, suffix: 'oxen' },
    {
      regex:
        /bison|buffalo|deer|duck|fish|moose|pike|plankton|salmon|sheep|squid|swine|trout|sheap|equipment|information|rice|money|species|series|news/i,
      suffix: '$&',
    }, // bison -> bison
    { regex: /(x|ch|ss|sh)$/gi, suffix: '$1es' }, // dish -> dishes, kiss -> kisses
    {
      regex: /(hetero|canto|photo|zero|piano|pro|kimono|portico|quarto)$/gi,
      suffix: '$1s',
    }, // kimono -> kimonos
    { regex: /(?:([^f])fe|([lr])f)$/, suffix: '$1$2ves' }, // knife -> knives, calf -> calves
    { regex: /o$/gi, suffix: 'oes' }, // hero -> heroes
    { regex: /([^aeiouy]|qu)y$/gi, suffix: '$1ies' }, // cherry -> cherries
    { regex: /s$/gi, suffix: 's' }, // cats -> cats
    { regex: /$/gi, suffix: 's' }, // cat -> cats
  ]

  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i]
    if (noun.match(rule.regex)) {
      noun = noun.replace(rule.regex, rule.suffix)
      break
    }
  }

  return noun
})
Vue.filter('truncate', function (text, stop, clamp) {
  if (text)
    return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
  else return ''
})
Vue.filter('ago', function (time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return ~~(between / 60) + ' minutes'
  } else if (between < 86400) {
    return ~~(between / 3600) + ' hours'
  } else {
    return ~~(between / 86400) + ' days'
  }
})
Vue.filter('titlecase', function (str) {
  if (str) {
    return str.replace(/\w\S*/g, function (txt) {
      let t
      if (txt) {
        t = txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      } else {
        t = str
      }
      return t
    })
  }
})
Vue.filter('uppercase', function (str) {
  return str.toUpperCase()
})
Vue.filter('pluralize', function (noun) {
  if (typeof noun !== 'string') {
    return noun
  }

  const rules = [
    { regex: /octopus/gi, suffix: 'octopusses' },
    { regex: /person/gi, suffix: 'people' },
    { regex: /ox/gi, suffix: 'oxen' },
    {
      regex:
        /bison|buffalo|deer|duck|fish|moose|pike|plankton|salmon|sheep|squid|swine|trout|sheap|equipment|information|rice|money|species|series|news/i,
      suffix: '$&',
    }, // bison -> bison
    { regex: /(x|ch|ss|sh)$/gi, suffix: '$1es' }, // dish -> dishes, kiss -> kisses
    {
      regex: /(hetero|canto|photo|zero|piano|pro|kimono|portico|quarto)$/gi,
      suffix: '$1s',
    }, // kimono -> kimonos
    { regex: /(?:([^f])fe|([lr])f)$/, suffix: '$1$2ves' }, // knife -> knives, calf -> calves
    { regex: /o$/gi, suffix: 'oes' }, // hero -> heroes
    { regex: /([^aeiouy]|qu)y$/gi, suffix: '$1ies' }, // cherry -> cherries
    { regex: /s$/gi, suffix: 's' }, // cats -> cats
    { regex: /$/gi, suffix: 's' }, // cat -> cats
  ]

  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i]
    if (noun.match(rule.regex)) {
      noun = noun.replace(rule.regex, rule.suffix)
      break
    }
  }

  return noun
})
// Vue.filter('datedm', function (value) {
//     return moment(value).format('ddd, Do MMM')
// })
// Vue.filter('time', function (value) {
//     return moment(value).format('hA')
// })
// Vue.filter('truncate', function (text, length, clamp) {
//     clamp = clamp || '...';
//     let node = document.createElement('div');
//     node.innerHTML = text;
//     let content = node.textContent;
//     return content.length > length ? content.slice(0, length) + clamp : content;
// })

Vue.filter('nl2br', function (text, stop, clamp) {
  return text.replace(/(?:\r\n|\r|\n)/g, '<br />')
})
Vue.filter('kb', function (num) {
  num = parseInt(num)
  if (typeof num !== 'number' || isNaN(num)) {
    return false
  }

  const neg = num < 0
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  if (neg) {
    num = -num
  }

  if (num < 1) {
    return (neg ? '-' : '') + num + ' B'
  }

  const exponent = Math.min(
    Math.floor(Math.log(num) / Math.log(1024)),
    units.length - 1
  )
  num = (num / Math.pow(1024, exponent)).toFixed(2) * 1
  const unit = units[exponent]

  return (neg ? '-' : '') + num + ' ' + unit
})
Vue.filter('first', function (text) {
  if (!text) return text
  return text.substring(0, 1).toUpperCase()
})
