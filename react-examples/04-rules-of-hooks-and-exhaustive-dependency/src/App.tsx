import { useEffect, useMemo, useState } from "react";

type Post = {
  id: string;
  title: string;
  content: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
};

function App() {
  const [records, setRecords] = useState<Post[]>();
  const [selectedRecord, setSelectedRecord] = useState<Post>();

  const reloadData = async () => {
    // const response = await fetch("http://ithb-pbp.hansyulian.online/post");
    const response = await fetch("http://localhost:5173/api/post");
    const data = await response.json();
    setRecords(data.records as Post[]);
  };

  useEffect(() => {
    reloadData();
  }, []);

  // rules of hooks
  // exhaustive dependency
  const someRecords = useMemo(() => {
    if (!records) {
      return [];
    }
    return records.slice(0, 10);
  }, [records]);

  if (!records) return <div>Loading</div>;

  // rules of hooks
  // const [selectedRecord, setSelectedRecord] = useState<Post>();

  // rules of hooks
  // exhaustive dependency
  // const someRecords = useMemo(() => {
  //   return records.slice(0, 10);
  // }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
            <th>Author</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {someRecords.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.title}</td>
              <td>{record.content}</td>
              <td>{record.authorName}</td>
              <td>{new Date(record.createdAt).toLocaleString()}</td>
              <td>{new Date(record.updatedAt).toLocaleString()}</td>
              <td>
                <button onClick={() => setSelectedRecord(record)}>
                  Select
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedRecord && <div>Selected Record: {selectedRecord.title}</div>}
    </div>
  );
}

export default App;
