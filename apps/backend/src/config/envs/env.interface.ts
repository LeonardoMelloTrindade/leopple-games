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

interface IS3Env {
  s3_url: string;
  s3_region: string;
  s3_access_key: string;
  s3_secret_key: string;
}

export { type IPostgreSqlEnv, type IRedisEnv, type IS3Env };
