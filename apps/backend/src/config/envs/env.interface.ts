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
  s3Url: string;
  s3Region: string;
  s3AccessKey: string;
  s3Secretey: string;
}

export { type IPostgreSqlEnv, type IRedisEnv, type IS3Env };
