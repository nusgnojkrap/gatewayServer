export default function isValidStructure(schema: any, data: any): boolean {
  if (typeof schema !== "object" || typeof data !== "object" || schema === null || data === null) {

    // 'int' 타입인 경우 실제 데이터는 숫자여야 함
    if (schema === "int") {
      return typeof data === "number";
    }
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