import LinkShortener from "./containers/LinkShortener.tsx";
import {Container} from "@mui/material";

const App = () => {
    return (
        <Container maxWidth='sm' sx={{textAlign: 'center', mt: '20px'}}>
            <LinkShortener/>
        </Container>
    )
}

export default App
