declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VITE_DEPLOYMENT_ENV: "development" | "staging" | "production";
    }
  }

  type DataMold = {
    userId: number;
    id: number;
    title: string;
    completed: false;
  };
}

export {};
