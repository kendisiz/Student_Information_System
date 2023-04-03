import styles from "@/styles/Student.module.css";

// Tanstack Query imports
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

export default function Student(props: any) {
  const fetchStudent = async (): Promise<any[]> => {
    const student = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${props.studentID}`
    );
    const studentJson = await student.json();
    console.log(studentJson);
    return studentJson;
  };

  const { status, data, error } = useQuery({
    queryKey: ["student", props.studentID],
    queryFn: fetchStudent,
  });

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    return <span>Error: {(error as any).message}</span>;
  }

  return (
    <div>
      <ul>
        {Object.entries(data).map((pair: any) => (
          <li key={pair[0]}>
            {pair[0]}
            {pair[1]}
          </li>
        ))}
      </ul>
    </div>
  );
}
