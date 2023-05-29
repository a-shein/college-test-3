export default function solution(content) {
  // BEGIN
  // prepare content
  const data = content.trim().split('\n').slice(2).map((item) => {
    let newItem = item.split('|')

    return {
      entity: newItem[1].trim(),
      habitat: newItem[2].trim(),
      type: newItem[3].trim(),
      ageLine: newItem[4].trim(),
      danger: newItem[5].trim() === 'Да'
    }
  })

  //1)
  console.log(`Всего растений в файле: ${data.length}`);

  //2)
  let copyData = Array.from(data);

  for (const item of copyData) {
    item.entity = item.entity.replace(item.entity[0], item.entity[0].toUpperCase())
  }

  const alphabetSort = copyData.sort(function (current, next) {
    return current.entity > next.entity ? 1 : -1;
  });

  console.log(alphabetSort);

  //3)
  copyData = Array.from(data);

  const dangerArr = []
  const notDangerArr = []

  for (const item of copyData) {
    if (item.danger === true) {
      dangerArr.push(item)
    } else {
      notDangerArr.push(item)
    }
  }

  console.log(`Процент опасных растений: ${dangerArr.length * 100 / copyData.length}`)
  console.log(`Процент безопасных растений: ${notDangerArr.length * 100 / copyData.length}`)

  //4)
  copyData = Array.from(data);

  const trees = copyData.filter((item) => {
    return item.habitat.includes('Леса')
  })
  // убираю сепараторы и прочуюю фигню
  trees.map((item) => {
    item.ageLine = item.ageLine.replace('лет', '')
        .replace('года', '')
        .replace('год', '')
        .trim()
        .split('-')
    return item
  })

  // суммирую года и перевожу в дни
  trees.map((item) => {
    if (item.ageLine.length === 1) {
        item.ageLine = Number(item.ageLine[0]) * 365

        return item
    }

    item.ageLine = item.ageLine.reduce((acc, subItem) => {
      return acc + Number(subItem) / item.ageLine.length * 365
    }, 0)

    item.ageLine = Math.round(item.ageLine)

    return item
  })

  const avgLiveTimeInDay = Math.round(trees.reduce((acc, item) => acc + item.ageLine, 0) / trees.length)

  console.log(`Среденее время жизни в днях всех лесных растений: ${avgLiveTimeInDay}`)


  //5
  copyData = Array.from(data);

  const danger = copyData.filter((item) => item.danger)

  const result = [];
  for (const item of danger) {
    if (!Object.hasOwn(result, item.habitat)) {
      result[item.habitat] = []
    }

    result[item.habitat].push(item)
  }

  const keys = Object.keys(result)

  for (const key of keys) {
    result[key] = result[key].length
  }

  console.log(result)

  const mostHabitat = result.reduce((acc, item) => {
    console.log(item)
    if (!Object.hasOwn(acc, item.habitat)) {
      acc[item.habitat] = 0
    }
    acc[item.habitat] += item.length

    return acc
  }, [])

  console.log(mostHabitat)

  // END
}
