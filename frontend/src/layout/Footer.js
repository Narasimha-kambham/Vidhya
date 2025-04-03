import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  useTheme,
} from "@mui/material";
import {
  YouTube as YouTubeIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  WhatsApp as WhatsAppIcon,
  Facebook as FacebookIcon,
} from "@mui/icons-material";
import SchoolIcon from "@mui/icons-material/School";

const FooterSection = ({ title, links }) => {
  const theme = useTheme();
  return (
    <Box sx={{ mb: { xs: 4, md: 0 } }}>
      <Typography
        variant="h6"
        sx={{
          fontFamily: "var(--font-family)",
          fontWeight: 500,
          color: theme.palette.text.primary,
          mb: 2,
        }}
      >
        {title}
      </Typography>
      <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
        {links.map((link, index) => (
          <Box component="li" key={index} sx={{ mb: 1 }}>
            <Link
              href="#"
              sx={{
                fontFamily: "var(--font-family)",
                fontWeight: 300,
                color: theme.palette.text.secondary,
                textDecoration: "none",
                transition: "color 0.2s ease",
                "&:hover": {
                  color: theme.palette.primary.main,
                },
              }}
            >
              {link}
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const SocialIcon = ({ icon: Icon, color }) => (
  <IconButton
    sx={{
      color: color,
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      },
    }}
  >
    <Icon />
  </IconButton>
);

function Footer() {
  const theme = useTheme();

  const footerSections = [
    {
      title: "Company",
      links: ["About Us", "Our Team", "Careers", "News & Media", "Contact Us"],
    },
    {
      title: "Services",
      links: [
        "Donors",
        "Mass Helpers",
        "Reservations",
        "Tax policy",
        "Receivers",
      ],
    },
    {
      title: "Support",
      links: [
        "Help Center",
        "FAQs",
        "Cancellation Policy",
        "Privacy Policy",
        "Terms & Conditions",
      ],
    },
    {
      title: "Resources",
      links: [
        "Blog",
        "Community",
        "Destination Insights",
        "Customer Reviews",
        "Affiliate Program",
      ],
    },
  ];

  const socialIcons = [
    { icon: YouTubeIcon, color: "#FF0000" },
    { icon: InstagramIcon, color: "#E4405F" },
    { icon: TwitterIcon, color: "#1DA1F2" },
    { icon: WhatsAppIcon, color: "#25D366" },
    { icon: FacebookIcon, color: "#1877F2" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        py: 6,
        mt: "auto",
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Grid
          container
          spacing={{ xs: 2, md: 4 }}
          sx={{
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          {footerSections.map((section, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={index}
              sx={{
                flex: { md: 1 },
                maxWidth: { md: "23%" },
              }}
            >
              <FooterSection title={section.title} links={section.links} />
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            mt: 4,
            pt: 3,
            borderTop: `1px solid ${theme.palette.divider}`,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <SchoolIcon sx={{ color: theme.palette.primary.main }} />
            <Typography
              variant="h6"
              sx={{
                fontFamily: "var(--font-family)",
                fontWeight: 700,
                color: theme.palette.primary.main,
              }}
            >
              Vidya
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 1,
            }}
          >
            {socialIcons.map((social, index) => (
              <SocialIcon key={index} icon={social.icon} color={social.color} />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
