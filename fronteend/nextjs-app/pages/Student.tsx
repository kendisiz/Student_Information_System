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
      `http://localhost:3000/students/${props.studentID}`
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
        {data[0]?.map((field: any) => (
          <li key={field}>{field}</li>
        ))}
      </ul>
    </div>
  );
}
