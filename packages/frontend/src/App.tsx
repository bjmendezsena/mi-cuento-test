import { TaskManagement } from "@/components";
import { RootProvider } from "@/providers";

function App() {
  return (
    <RootProvider>
      <TaskManagement />
    </RootProvider>
  );
}

export default App;
