import styles from "@/styles/Home.module.css";
import Student from "./Student";

// Tanstack Query imports
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

export default function MainPage() {
  const fetchSemesters = async (): Promise<any[]> => {
    const semesters = await fetch(
      "https://jsonplaceholder.typicode.com/todos/"
    );
    const semestersJson = await semesters.json();
    console.log(semestersJson);
    return semestersJson;
  };

  const { status, data, error } = useQuery({
    queryKey: ["semesters"],
    queryFn: fetchSemesters,
  });

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    return <span>Error: {(error as any).message}</span>;
  }

  return (
    <main>
      <div>
        <ul>
          {data?.map((todo) => (
            <ul key={todo.userID}>
              <li>{todo.id}</li>
              <li>{todo.title}</li>
              <li>{todo.completed}</li>
            </ul>
          ))}
        </ul>
        <Student studentID="6" />
      </div>
    </main>
  );
}
