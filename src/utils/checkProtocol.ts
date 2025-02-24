export default function isValidStructure(schema: any, data: any): boolean {
    if (typeof schema !== "object" || typeof data !== "object" || schema === null || data === null) {
      // "int"는 실제 데이터에서 숫자여야 함
      if (schema === "int") return typeof data === "number";
      return typeof data === schema;
    }
  
    const schemaKeys = Object.keys(schema);
    const dataKeys = Object.keys(data);
  
    // 필드 개수 검증 (데이터 구조와 실제 데이터 키 개수 비교)
    if (schemaKeys.length !== dataKeys.length) {
      return false;
    }
  
    // 모든 키가 존재하며, 데이터 타입이 일치하는지 검증
    for (const key of schemaKeys) {
      if (!data.hasOwnProperty(key) || !isValidStructure(schema[key], data[key])) {
        return false;
      }
    }
  
    return true;
}


  // ✅ 테스트 예제
const schema = {
    data: {
      data1: "string",
      data2: "string",
      data3: {
        Sdata1: "string",
        Sdata2: "string",
      },
    },
    info: {
      age: "int", // "int"는 실제 데이터에서 숫자여야 함
      sex: "string",
      "last name": "string",
      "first name": "string",
    },
  };
  
  const validData = {
    data: {
      data1: "Hello",
      data2: "World",
      data3: {
        Sdata1: "Nested",
        Sdata2: "Data",
      },
    },
    info: {
      age: 25, // 숫자로 되어 있어야 함
      sex: "Male",
      "last name": "Doe",
      "first name": "John",
    },
  };
  
  const invalidData = {
    data: {
      data1: "Hello",
      data2: "World",
      data3: {
        Sdata1: "Nested",
        Sdata2: "Data",
      },
    },
    info: {
      age: "25", // ❌ 숫자가 아니라 문자열 -> 실패
      sex: "Male",
      "last name": "Doe",
      "first name": "John",
    },
  };