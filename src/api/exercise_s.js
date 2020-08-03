import request from '@/utils/request'

export function fetchunfinishedList(query) {
  return request({
    url: '/user/homework/unfinished',
    method: 'post',
    params: query
  })
}

export function fetchfinishedList(query) {
  return request({
    url: '/user/homework/finished',
    method: 'post',
    params: query
  })
}

//作业/考试/练习中的一次题目列表
export function fetchHomework(query) {
  return request({
    url: '/user/homework/homework',
    method: 'post',
    params: query
  })
}

export function fetchExercise(query) {
  return request({
    url: '/user/assignment/exercise',
    method: 'post',
    data: query
  })
}

export function commitExercise(query) {
  // return request({
  //   url: '/user/homework/commit',
  //   method: 'post',
  //   params: query
  // })
  return request({
    url: '/vlg-run',
    method: 'post',
    data: query
  })
}

export function commitHomework(data) {
  return request({
    url: '/user/homework/create',
    method: 'post',
    data
  })
}
