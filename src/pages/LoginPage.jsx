import "../assets/css/Login/Login.css";
import Logo from "../assets/img/Login/logo.jpeg";

export const LoginPage = () => {
  return (
    <div className="app">
      <section className="principal-section">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-6">
              <div className="img-cont text-center">
                <img alt="Luvikah Logo" src={Logo} className="img-logo" />
                <h2 className="text-center text-lg-start">
                  Con Luvikah Connect, conecta con lo que amas de manera
                  sencilla y rápida.
                </h2>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <form action="">
                    <div className="row text-center">
                      <div className="col-md-12">
                        <input
                          type="email"
                          placeholder="Ingresa tu correco electrónico"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-12">
                        <input
                          type="password"
                          placeholder="Ingresa tu contraseña"
                          className="form-control"
                        />
                      </div>
                    </div>{" "}
                    <div className="row mt-3">
                      <div className="col-md-12 text-center">
                        <button className="btn btn-login">
                          Iniciar Sesion
                        </button>
                        <p className="mt-1">
                          ¿No tienes cuenta?{" "}
                          <span style={{ textDecoration: "underline" }}>
                            Regístrate
                          </span>
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
