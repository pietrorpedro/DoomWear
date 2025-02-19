
import { AppBar, Box, Collapse, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from "@mui/icons-material/Menu";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { getCategories } from "../../services/CategoryService";

export default function Header() {

    const { user, loading } = useAuth();
    const [open, setOpen] = useState(false);
    const [openProfileDrawer, setOpenProfileDrawer] = useState(false);
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        async function get() {
            const res = await getCategories();
            setCategories(res);
        }
        get();
    }, [getCategories])

    const toggleDrawer = () => {
        setOpen(!open);
    }

    const toggleProfileDrawer = () => {
        setOpenProfileDrawer(!openProfileDrawer);
    }

    const handleNavigate = (link) => {
        setOpen(false);
        navigate(`/${link}`);
    }

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation">
            <List>
                <ListSubheader>Ações</ListSubheader>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => handleNavigate("")}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inicio" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => handleNavigate("search")}>
                        <ListItemIcon>
                            <SearchIcon />
                        </ListItemIcon>
                        <ListItemText primary="Buscar" />
                    </ListItemButton>
                </ListItem>
                {user ? (
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleNavigate("cart")}>
                            <ListItemIcon>
                                <ShoppingCartIcon />
                            </ListItemIcon>
                            <ListItemText primary="Carrinho" />
                        </ListItemButton>
                    </ListItem>
                ) : (
                    <></>
                )}

                <ListItemButton onClick={toggleProfileDrawer}>
                    <ListItemIcon>
                        <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Perfil" />
                    {openProfileDrawer ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItemButton>
                <Collapse in={openProfileDrawer} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>

                        {user ? (
                            <>
                                <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigate("profile")}>
                                    <ListItemIcon>
                                        <OpenInFullIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Abrir perfil" />
                                </ListItemButton>
                                <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigate("logout")}>
                                    <ListItemIcon>
                                        <LogoutIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Sair" />
                                </ListItemButton>
                            </>
                        ) : (
                            <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigate("auth")}>
                                <ListItemIcon>
                                    <LoginIcon />
                                </ListItemIcon>
                                <ListItemText primary="Entrar" />
                            </ListItemButton>
                        )}
                    </List>
                </Collapse>

                <Divider sx={{ marginY: 2 }} />

                <ListSubheader>Categorias</ListSubheader>
                {categories.map(category => (
                    <ListItemButton sx={{ pl: 2 }} key={category.id} onClick={() => handleNavigate(`category/${category.link}`)}>
                        <ListItemText primary={category.name} />
                    </ListItemButton>
                ))}
            </List>
        </Box>
    )

    if (loading) return <></>;

    return (
        <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
            <Drawer open={open} onClose={toggleDrawer}>{DrawerList}</Drawer>
            <AppBar sx={{
                position: "static",
                padding: { xs: 1, md: 0 },
            }}>
                <Toolbar sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: { xs: 0, md: 1 },
                }}>
                    <Box sx={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: { xs: "center", md: "space-between" },
                        width: "100%"
                    }}>
                        <IconButton
                            sx={{
                                position: "absolute",
                                left: 10,
                                display: { xs: "block", md: "none" }
                            }}
                            onClick={toggleDrawer}
                        >
                            <MenuIcon sx={{ color: "white" }} />
                        </IconButton>

                        <Typography variant="h4">DoomWear</Typography>

                        <Box sx={{
                            display: { xs: "none", md: "flex" },
                            alignItems: "center",
                            gap: 2,
                        }}>
                            <Link to={"/"}>
                                <Typography variant="button"><b>Início</b></Typography>
                            </Link>
                            <Link to={"/search"}>
                                <Typography variant="button"><b>Buscar</b></Typography>
                            </Link>
                            {user ? (
                                <>
                                    <Link to={"/profile"}>
                                        <Typography variant="button"><b>Perfil</b></Typography>
                                    </Link>
                                    <Link to={"/cart"}>
                                        <IconButton color="inherit">
                                            <ShoppingCartIcon/>
                                        </IconButton>
                                    </Link>

                                </>

                            ) : (
                                <Link to={"/auth"}>
                                    <Typography variant="button"><b>Entrar</b></Typography>
                                </Link>
                            )}
                        </Box>
                    </Box>
                    <Box sx={{
                        display: { xs: "none", md: "flex" },
                        gap: 2,
                        marginTop: 1
                    }}>
                        {categories.map(category => (
                            <Link to={`category/${category.link}`} key={category.id}>
                                <Typography variant="button"><b>{category.name}</b></Typography>
                            </Link>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}