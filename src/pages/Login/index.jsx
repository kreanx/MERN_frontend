import React from "react"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"
import {useForm} from "react-hook-form"

import styles from "./Login.module.scss"
import {useDispatch, useSelector} from "react-redux"
import {fetchAuth, selectIsAuth} from "../../redux/slices/auth"
import {Navigate} from "react-router-dom"

export const Login = ({checkId}) => {
    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)

    const {
        register,
        handleSubmit,
        setError,
        formState: {errors, isValid},
    } = useForm({
        defaultValues: {
            login: "login",
            password: "12345",
        },
        mode: "onChange",
    })

    const onSubmit = async (values) => {
        const data = await dispatch(fetchAuth(values))
        if (!data.payload) {
            alert("Не удалось авторизоваться")
        }

        dispatch(fetchAuth(values))
        if ("token" in data.payload) {
            window.localStorage.setItem("token", data.payload.token)
        }
    }

    if (isAuth) {
        return <Navigate to="/" />
    }

    return (
        <Paper classes={{root: styles.root}} elevation={0}>
            <Typography classes={{root: styles.title}} variant="h5">
                Вход в аккаунт
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    label="login"
                    error={Boolean(errors.login?.message)}
                    helperText={errors.login?.message}
                    {...register("login", {required: "Укажите логин"})}
                    fullWidth
                />
                <TextField
                    className={styles.field}
                    label="Пароль"
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    {...register("password", {required: "Укажите пароль"})}
                    fullWidth
                />
                <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    fullWidth
                >
                    Войти
                </Button>
            </form>
        </Paper>
    )
}
