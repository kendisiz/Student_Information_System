import styles from "@/styles/Home.module.css";

// import allTypes
import { SemesterResponse } from "@/allTypes";

// Tanstack Query imports
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

export default function MainPage() {
  const fetchSemesters = async (): Promise<any[]> => {
    const semesters = await fetch("http://localhost:3000/semesters");
    console.log(semesters);
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
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Test</p>
        <ul>
          {data?.map((todo) => (
            <ul key={todo[0]}>
              <li>{todo[0]}</li>
              <li>{todo[1]}</li>
              <li>{todo[2]}</li>
              <li>{todo[3].toString()}</li>
            </ul>
          ))}
        </ul>
      </div>
    </main>
  );
}
