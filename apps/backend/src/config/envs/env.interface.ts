interface IPostgreSqlEnv {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

interface IRedisEnv {
  host: string;
  port: number;
  password: string;
}

export { type IPostgreSqlEnv, type IRedisEnv };
