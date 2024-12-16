'use client'
import { useEffect, useState } from 'react';

export default function TestPage() {
  // 데이터를 저장할 상태 변수
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  // 컴포넌트가 처음 렌더링될 때 API 호출
    useEffect(() => {
    // 비동기 함수로 API 호출
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/test');  // 백엔드 API 호출
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result.data); // 응답에서 받은 'data' 값을 상태에 저장

            } catch (err) {
                setError(err.message); // 오류 발생 시 상태에 오류 메시지 저장
            } finally {
                setLoading(false); // 로딩 상태 변경
            }
        };

        fetchData();
    }, []); // 빈 배열로 설정하여 컴포넌트가 처음 렌더링될 때만 실행

  if (loading) return <div>Loading...</div>; // 로딩 중일 때
  if (error) return <div>Error: {error}</div>; // 오류 발생 시

    return (
        <div>
            <h1>API Data</h1>
            <p>{data}</p>
        </div>
    );
}
