describe("사용자 스토리", () => {
  describe("Todos", () => {
    describe("story-1, 할일 목록을 볼 수 있다", () => {
      describe("목록이 없을때", () => {
        test("all 탭에는 '할일이 없습니다'를 보여준다", () => {
          /**
           * component : presentation component 구현
           * component : props, state 분리, propTypes 타입체크
           * component ui event : useState, useCallbak 으로 컴포넌트 이벤트 핸들러 구현
           * data : 모델링 > 정규화 > ProTypes
           * server api : req/res 모델링
           * store : state 모델링
           * action : action type (ex: todos/FETCH_TODOS_REQUEST), action creator (ex: fetchTodos)
           * reducer : byId, createList 파일 구성 > getTodos, getIsFetching, getErrMessage selector
           * component : container component 구현
           **/
        })
        test("active 탭에는 '할일이 없습니다'를 보여준다", () => {})
        test("completed 탭에는 '할일이 없습니다'를 보여준다", () => {})
      })
      describe("목록이 있을때", () => {
        test("all 탭에는 모든 리스트를 볼 수 있다", () => {})
        test("active 탭에는 미완료된 리스트를 볼 수 있다", () => {})
        test("completed 탭에는 완료된 리스트를 볼 수 있다", () => {})
      })
    })
    describe("story-2, 할일을 추가할 수 있다", () => {
      describe("목록에서", () => {
        test("all 탭에 입력한 할일이 추가 된다", () => {})
        test("active 탭에도 입력한 할일이 추가 된다", () => {})
        test("completed 탭에는 입력한 할일이 없다", () => {})
      })
      describe("입력창에서", () => {
        describe("입력 전에는", () => {
          test("초기 입력창에 '오늘 할 일 적어보기' 문구가 보인다", () => {})
        })
        describe("입력 중에는", () => {
          test("입력창에 텍스트가 입력되면 '오늘 할 일 적어보기' 문구가 사라지고 입력하는 텍스트가 보인다", () => {})
          test("비활성화 된 'ADD TODO' 버튼이 텍스트가 입력되면 활성화 된다", () => {})
        })
        describe("입력 완료 후에는", () => {
          test("엔터를 치면 입력 완료된다", () => {})
          test("'ADD TODO' 버튼을 누르면 입력 완료된다", () => {})
          test("입력창이 초기화 되고 '오늘 할 일 적어보기'가 보인다", () => {})
          test("'ADD TODO' 버튼이 비활성화 된다", () => {})
        })
      })
    })
    describe("story-3, 할일을 완료 처리할 수 있다", () => {
      test("all 탭에 완료 표기 된다", () => {})
      test("active 탭에 완료된 할일이 없다", () => {})
      test("completed 탭에는 완료한 할일이 추가 된다", () => {})
    })
    describe("story-4, 할일을 삭제할 수 있다", () => {
      test("all 탭에 삭제한 할일 없다", () => {})
      test("active 탭에도 삭제한 할일 없다", () => {})
      test("completed 탭에는 삭제한 할일 없다", () => {})
    })
  })
})
