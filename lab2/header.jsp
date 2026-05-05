<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
<title>Auction</title>
<link rel="stylesheet" type="text/css" href="styles/HeaderStyles.css">
<link rel="stylesheet" type="text/css" href="styles/BodyStyles.css">
<link rel="stylesheet" type="text/css" href="styles/ButtonStyles.css">
<link rel="stylesheet" type="text/css" href="styles/FieldStyles.css">
<link rel="stylesheet" type="text/css" href="styles/TableStyles.css">
<link rel="stylesheet" type="text/css"
	href="styles/LittlePageStyles.css">
<link rel="stylesheet" type="text/css"
	href="styles/EditingPageStyles.css">
</head>
<body>

	<input type="hidden" name="login" value="${user}">
	<input type="hidden" name="userType" value="${userType}">
	<input type="hidden" id="currentPage" name="currentPage"
		value="${page}">

	<header>
		<nav>
			<ul>
				<li><form name="menuForm" method="POST" action="controller">
						<input type="hidden" name="login" value="${user}"> <input
							type="hidden" name="command" value="home" />
						<button class="title" type="submit" id="home">ONLINE-AUCTION</button>
					</form></li>

				<c:choose>

					<c:when test="${userType eq 'user'}">
						<li><form name="menuForm" method="POST" action="controller">
								<input type="hidden" name="login" value="${user}"> <input
									type="hidden" name="command" value="goods" /> <input
									type="hidden" name="filterName" value="All goods">
								<button name="colorButton" type="submit" id="goods">All
									goods</button>
							</form></li>
						<li><form name="menuForm" method="POST" action="controller">
								<input type="hidden" name="login" value="${user}"> <input
									type="hidden" name="command" value="trades" /><input
									type="hidden" name="filterName" value="All trades">
								<button name="colorButton" type="submit" id="trades">My
									trades</button>
							</form></li>
						<li><form name="menuForm" method="POST" action="controller">
								<input type="hidden" name="login" value="${user}"> <input
									type="hidden" name="command" value="myGoods" /> <input
									type="hidden" name="filterName" value="On sale">
								<button name="colorButton" type="submit" id="myGoods">My
									goods</button>
							</form></li>
					</c:when>

					<c:when test="${userType eq 'moder'}">
						<li><form name="menuForm" method="POST" action="controller">
								<input type="hidden" name="login" value="${user}"> <input
									type="hidden" name="command" value="users" /> <input
									type="hidden" name="filterName" value="Normal users">
								<button name="colorButton" type="submit" id="users">All
									users</button>
							</form></li>
						<li><form name="menuForm" method="POST" action="controller">
								<input type="hidden" name="login" value="${user}"> <input
									type="hidden" name="command" value="goods" /> <input
									type="hidden" name="filterName" value="All goods">
								<button name="colorButton" type="submit" id="goods">All
									goods</button>
							</form></li>
					</c:when>

					<c:when test="${userType eq 'admin'}">
						<li><form name="menuForm" method="POST" action="controller">
								<input type="hidden" name="login" value="${user}"> <input
									type="hidden" name="command" value="users" /> <input
									type="hidden" name="filterName" value="All users">
								<button name="colorButton" type="submit" id="users">All
									users</button>
							</form></li>
					</c:when>

				</c:choose>

				<li><form name="logoutForm" method="POST" action="controller">
						<input type="hidden" name="command" value="logout" />
						<button class="small" type="submit" id="logout">Logout</button>
					</form></li>
			</ul>
		</nav>
	</header>

	<script src="js/headerScript.js"></script>

</body>
</html>
