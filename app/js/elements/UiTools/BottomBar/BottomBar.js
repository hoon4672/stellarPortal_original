import React, { PropTypes } from 'react';
import { Container, Icon, Menu, Button } from 'semantic-ui-react'

const light = {
  color: '#bababa',
};

const Layout = ({ goDesktop }) =>
  <Menu fixed="bottom" inverted>
    <Container>
      <Menu.Item>
          <span style={light}>
          Made with &nbsp; <Icon name="heart" /> by &nbsp;<a href="https://ngfar.io" target="_blank">ngfar</a>
          </span>
      </Menu.Item>
      <Menu.Item>
          <span style={light}>
          <a href="https://stellar.org" target="_blank">stellar.org</a>
          </span>
      </Menu.Item>
      <Menu.Item onClick={goDesktop}>
          <Icon name="apple" />
          <Icon name="linux" />
          <span style={light}>
          Desktop
          </span>
      </Menu.Item>
      <Menu.Item position="right">
          <span style={light}>
           Hey, it's Open Source :&nbsp;
          </span>
        <Button
          icon="github"
          compact
          onClick={() => window.open("https://github.com/pakokrew/stellar-portal")}
        />
      </Menu.Item>
    </Container>
  </Menu>;

Layout.propTypes = {
  goDesktop: PropTypes.func.isRequired,
};

export default Layout;
